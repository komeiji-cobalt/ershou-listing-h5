import { useEffect, useMemo, useRef, useState } from 'react'
import { buildListing, CATEGORIES, OTHER, CONDITIONS, EXAMPLES, STYLES, detectCategory } from './engine.js'

const EMPTY = { desc: '', conditionId: 'nine', purchasePrice: '', usedMonths: '', brandModel: '', city: '', categoryId: '', styleId: 'concise' }
const HKEY = 'ershou-listing.history.v1'

function useCopy() {
  const [copied, setCopied] = useState('')
  const [toast, setToast] = useState('')
  const timer = useRef(null)
  useEffect(() => () => clearTimeout(timer.current), [])
  const copy = async (key, text) => {
    let success = false
    try {
      await navigator.clipboard.writeText(text)
      success = true
    } catch {
      const focused = document.activeElement
      const ta = document.createElement('textarea')
      ta.value = text
      ta.style.cssText = 'position:fixed;top:0;left:-9999px;opacity:0'
      ta.setAttribute('readonly', '')
      document.body.appendChild(ta)
      try {
        ta.select()
        success = document.execCommand('copy')
      } catch { success = false } finally {
        ta.remove()
        focused?.focus({ preventScroll: true })
      }
    }
    clearTimeout(timer.current)
    setCopied(success ? key : '')
    setToast(success ? '已复制，可以去粘贴啦' : '复制未完成，请长按文案手动复制')
    timer.current = setTimeout(() => { setCopied(''); setToast('') }, 2200)
  }
  return [copied, copy, toast]
}

function StyleToggle({ value, onChange }) {
  return (
    <div className="style-picker" role="group" aria-label="文案风格">
      <span className="lbl">文案风格</span>
      <div className="seg style-seg">
        {STYLES.map((style) => (
          <button type="button" key={style.id} aria-pressed={value === style.id}
            className={value === style.id ? 'on' : ''} onClick={() => onChange(style.id)}>
            <b>{style.label}</b><small>{style.hint}</small>
          </button>
        ))}
      </div>
    </div>
  )
}

export default function App() {
  const [tab, setTab] = useState('write')
  const [f, setF] = useState(EMPTY)
  const [more, setMore] = useState(false)
  const [result, setResult] = useState(null)
  const [resultInput, setResultInput] = useState(null)
  const [photoUrl, setPhotoUrl] = useState('')
  const [history, setHistory] = useState(() => { try { return JSON.parse(localStorage.getItem(HKEY) || '[]') } catch { return [] } })
  const [copied, copy, toast] = useCopy()

  useEffect(() => () => { if (photoUrl) URL.revokeObjectURL(photoUrl) }, [photoUrl])
  useEffect(() => { localStorage.setItem(HKEY, JSON.stringify(history.slice(0, 8))) }, [history])

  const set = (k) => (e) => setF({ ...f, [k]: typeof e === 'string' ? e : e.target.value })
  const live = useMemo(() => (f.desc.trim().length >= 4 ? detectCategory(f.desc + ' ' + f.brandModel) : null), [f.desc, f.brandModel])

  const onPhoto = (e) => {
    const file = e.target.files?.[0]
    if (photoUrl) URL.revokeObjectURL(photoUrl)
    if (!file) { setPhotoUrl(''); return }
    setPhotoUrl(URL.createObjectURL(file))
  }

  const generate = () => {
    if (f.desc.trim().length < 6) return
    const r = buildListing(f)
    setResult(r); setResultInput({ ...f }); setTab('result')
    setHistory([{ at: Date.now(), input: f, title: r.title }, ...history.filter((h) => h.input.desc !== f.desc)].slice(0, 8))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const useExample = (ex) => {
    const { label, ...rest } = ex
    setF({ ...EMPTY, ...rest, styleId: f.styleId })
    setMore(true)
  }

  const changeResultStyle = (styleId) => {
    const input = { ...resultInput, styleId }
    setResultInput(input)
    setResult(buildListing(input))
    setF((current) => ({ ...current, styleId }))
    setHistory((current) => current.map((entry) => entry.input.desc === input.desc ? { ...entry, input: { ...entry.input, styleId } } : entry))
  }

  return (
    <div className="app">
      <header className="hero">
        <div className="brand">
          <span className="logo">闲置</span>
          <div>
            <h1>成帖助手</h1>
            <p>一句话描述，生成可复制的闲鱼文案</p>
          </div>
        </div>
        <nav className="tabs">
          <button className={tab === 'write' ? 'on' : ''} onClick={() => setTab('write')}>① 描述闲置</button>
          <button className={tab === 'result' ? 'on' : ''} disabled={!result} onClick={() => setTab('result')}>② 成帖文案</button>
          <button className={tab === 'guide' ? 'on' : ''} onClick={() => setTab('guide')}>③ 发布提示</button>
        </nav>
      </header>

      <main>
        {tab === 'write' && (
          <section className="card">
            <label className="lbl">物品描述<span className="req">必填</span></label>
            <textarea rows={5} value={f.desc} onChange={set('desc')} maxLength={500}
              placeholder="用平常说话的方式写就行，例如：美的空气炸锅 3.5L，用了几个月，功能正常，有轻微使用痕迹" />
            <div className="meta">
              {live ? <span className="chip-cat">{live.cat.icon} 识别为：{live.cat.name}</span> : <span className="hint">写下几句后自动识别品类</span>}
              <span className="count">{f.desc.length}/500</span>
            </div>

            <label className="lbl" style={{ marginTop: 14 }}>照片预览（可选，仅本机，不上传）</label>
            <label className={`photo ${photoUrl ? 'has' : ''}`}>
              {photoUrl ? <img src={photoUrl} alt="预览" /> : <span>点击添加照片<br /><small>不会上传到服务器</small></span>}
              <input type="file" accept="image/*" onChange={onPhoto} />
            </label>

            <div className="examples">
              <span>试试：</span>
              {EXAMPLES.map((ex) => <button key={ex.label} type="button" onClick={() => useExample(ex)}>{ex.label}</button>)}
            </div>

            <button type="button" className="more" onClick={() => setMore(!more)}>{more ? '收起补充信息 ▲' : '补充成色、购入价、型号（可选）▼'}</button>
            {more && (
              <div className="grid">
                <div className="full">
                  <label className="lbl">成色</label>
                  <div className="seg">
                    {CONDITIONS.map((c) => (
                      <button type="button" key={c.id} className={f.conditionId === c.id ? 'on' : ''} onClick={() => setF({ ...f, conditionId: c.id })}>{c.label}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="lbl">购入价（元）</label>
                  <input inputMode="decimal" value={f.purchasePrice} onChange={set('purchasePrice')} placeholder="如：299" />
                </div>
                <div>
                  <label className="lbl">使用月数</label>
                  <input inputMode="numeric" value={f.usedMonths} onChange={set('usedMonths')} placeholder="如：5" />
                </div>
                <div>
                  <label className="lbl">品牌 / 型号</label>
                  <input value={f.brandModel} onChange={set('brandModel')} placeholder="如：美的 3.5L" />
                </div>
                <div>
                  <label className="lbl">所在城市</label>
                  <input value={f.city} onChange={set('city')} placeholder="如：海口" />
                </div>
                <div className="full">
                  <label className="lbl">品类（默认自动识别）</label>
                  <select value={f.categoryId} onChange={set('categoryId')}>
                    <option value="">自动识别</option>
                    {[...CATEGORIES, OTHER].map((c) => <option key={c.id} value={c.id}>{c.icon} {c.name}</option>)}
                  </select>
                </div>
              </div>
            )}

            <StyleToggle value={f.styleId} onChange={(styleId) => setF((current) => ({ ...current, styleId }))} />
            <button type="button" className="primary" disabled={f.desc.trim().length < 6} onClick={generate}>生成成帖文案</button>
            <p className="foot-note">内容只保存在你的手机浏览器里，不会上传。参考价为启发式估算，非真实行情。</p>

            {history.length > 0 && (
              <div className="history">
                <div className="h-head"><b>最近生成</b><button type="button" onClick={() => setHistory([])}>清空</button></div>
                {history.map((h) => (
                  <button type="button" key={h.at} className="h-item" onClick={() => { setF({ ...EMPTY, ...h.input }); const r = buildListing(h.input); setResult(r); setResultInput({ ...EMPTY, ...h.input }); setTab('result') }}>
                    <span>{h.title}</span><small>{new Date(h.at).toLocaleDateString('zh-CN')}</small>
                  </button>
                ))}
              </div>
            )}
          </section>
        )}

        {tab === 'result' && result && (
          <>
            <section className="card result-top">
              <div className="badges">
                <span className="badge">{result.cat.icon} {result.cat.name}</span>
                <span className="badge alt">{result.condition.label}</span>
                {result.softened > 0 && <span className="badge soft">措辞已平和化</span>}
              </div>
              <StyleToggle value={result.styleId} onChange={changeResultStyle} />
              <h2 className="r-title">{result.title}</h2>
              <div className="price-card">
                <div className="price">¥{result.priceRange.low} – {result.priceRange.high}</div>
                <p>{result.priceRange.note}</p>
              </div>
              <div className="actions">
                <button type="button" className="primary sm" onClick={() => copy('title', result.title)}>{copied === 'title' ? '已复制标题' : '复制标题'}</button>
                <button type="button" className="ghost sm" onClick={() => copy('full', result.fullCopy)}>{copied === 'full' ? '已复制全文' : '一键复制全文'}</button>
              </div>
            </section>

            <section className="card">
              <div className="b-head"><h3>卖点亮点</h3><button type="button" className="link" onClick={() => copy('points', result.sellingPoints.map((p, i) => `${i + 1}. ${p}`).join('\n'))}>{copied === 'points' ? '已复制' : '复制'}</button></div>
              <ul className="points">{result.sellingPoints.map((p) => <li key={p}>{p}</li>)}</ul>
            </section>

            <section className="card">
              <div className="b-head"><h3>成色说明</h3><button type="button" className="link" onClick={() => copy('cond', result.conditionNotes)}>{copied === 'cond' ? '已复制' : '复制'}</button></div>
              <p className="b-text">{result.conditionNotes}</p>
            </section>

            <section className="card">
              <div className="b-head"><h3>参考价文案</h3><button type="button" className="link" onClick={() => copy('price', result.priceCopy)}>{copied === 'price' ? '已复制' : '复制'}</button></div>
              <p className="b-text">{result.priceCopy}</p>
            </section>

            <section className="card">
              <div className="b-head"><h3>交易提示</h3><button type="button" className="link" onClick={() => copy('trade', result.transactionTips)}>{copied === 'trade' ? '已复制' : '复制'}</button></div>
              <p className="b-text">{result.transactionTips}</p>
            </section>

            <section className="card">
              <div className="b-head"><h3>完整成帖文案</h3><button type="button" className="link" onClick={() => copy('full2', result.fullCopy)}>{copied === 'full2' ? '已复制' : '复制'}</button></div>
              <pre className="full-text">{result.fullCopy}</pre>
            </section>

            <section className="card tips">
              <h3>小建议</h3>
              <ul>{result.tips.map((t) => <li key={t}>{t}</li>)}</ul>
              <button type="button" className="ghost" onClick={() => setTab('guide')}>查看发布提示</button>
            </section>
          </>
        )}

        {tab === 'guide' && (
          <>
            <section className="card">
              <h3>拍照小建议</h3>
              <ul className="steps">
                <li><span className="n">1</span><div><b>光线均匀</b><p>白天靠窗自然光最好，避免强闪光造成反光。</p></div></li>
                <li><span className="n">2</span><div><b>多角度</b><p>正面、侧面、细节瑕疵各一张，诚实展示更易成交。</p></div></li>
                <li><span className="n">3</span><div><b>干净背景</b><p>浅色桌面或墙面，突出物品本身。</p></div></li>
              </ul>
            </section>
            <section className="card">
              <h3>定价心态</h3>
              <p className="b-text">本工具给出的是启发式参考区间，不是真实市场行情。可先略高于心理价，再根据询价微调；急出可贴近区间下限。</p>
            </section>
            <section className="card">
              <h3>平台与安全</h3>
              <div className="channels">
                <div className="ch"><span className="ci">🐟</span><div><b>闲鱼 / 二手社区</b><p>适合日用、数码、服饰；文案复制后自行发布。</p></div></div>
                <div className="ch"><span className="ci">🔄</span><div><b>转转等综合二手</b><p>部分品类可走验货；具体规则以平台为准。</p></div></div>
                <div className="ch"><span className="ci">📖</span><div><b>图书回收类</b><p>教材旧书可对比专类平台，打包往往更划算。</p></div></div>
              </div>
              <p className="b-text" style={{ marginTop: 12 }}>安全提醒：优先当面验货；平台内沟通；勿点击站外陌生链接或扫不明二维码。本工具不代发帖、不对接交易、不处理支付。</p>
            </section>
          </>
        )}
      </main>

      <div className={`copy-toast ${toast ? 'visible' : ''}`} role="status" aria-live="polite" aria-atomic="true">{toast}</div>
      <footer>闲置成帖助手 · 本地规则生成 · 不上传不代发</footer>
    </div>
  )
}
