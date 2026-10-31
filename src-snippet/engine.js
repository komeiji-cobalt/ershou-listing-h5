// 本地规则引擎：品类识别 + 卖点组装 + 成色话术 + 启发式参考价

export const CATEGORIES = [
  {
    id: 'digital', name: '数码配件', icon: '📱',
    keywords: ['手机', 'iPhone', '华为', '小米', '平板', 'iPad', '电脑', '笔记本', 'MacBook', '耳机', 'AirPods', '音响', '相机', '镜头', '充电器', '充电宝', '键盘', '鼠标', '手表', '手环', 'Switch', 'PS5', 'Xbox', '游戏机', '显卡', '硬盘', 'SSD', '路由器', '蓝牙耳机', '降噪耳机', '显示器', '机械键盘', '固态硬盘', '移动硬盘', '内存条', '摄像头', 'Kindle', '电子阅读器', '数据线', '扩展坞', '游戏手柄', '无线网卡'],
    defaultPriceRange: [80, 1200],

    conditionTips: ['建议写明是否进水/维修史', '屏幕、边框细痕如实说明'],
  },
  {
    id: 'appliance', name: '家电', icon: '🔌',
    keywords: ['空气炸锅', '电饭煲', '洗衣机', '冰箱', '空调', '风扇', '吸尘器', '扫地机', '微波炉', '烤箱', '热水器', '吹风机', '卷发棒', '净水器', '加湿器', '除湿机', '投影仪', '电视', '电磁炉', '电压力锅', '电水壶', '电热水壶', '破壁机', '榨汁机', '豆浆机', '咖啡机', '电饼铛', '挂烫机', '空气净化器', '扫地机器人'],
    defaultPriceRange: [50, 800],

    conditionTips: ['写明容量或功率更清晰', '附带说明书/原装盒可加分'],
  },
  {
    id: 'fashion', name: '服饰鞋包', icon: '👕',
    keywords: ['衣服', '外套', '羽绒服', '大衣', '裙子', '裤子', '牛仔裤', '卫衣', '衬衫', '鞋', '运动鞋', '靴子', '包', '背包', '双肩包', '手提包', '腰带', '帽子', '围巾', '冲锋衣', '针织衫', '连衣裙', '西装', '帆布鞋', '凉鞋', '行李箱', '拉杆箱'],
    defaultPriceRange: [30, 400],

    conditionTips: ['写明尺码与适合季节', '洗涤方式或是否干洗过可补充'],
  },
  {
    id: 'beauty', name: '美妆个护', icon: '💄',
    keywords: ['口红', '粉底', '护肤', '精华', '面膜', '香水', '洗发水', '沐浴露', '电动牙刷', '剃须刀', '美妆', '化妆', '面霜', '防晒', '卸妆水', '洁面乳', '眼影', '腮红', '洗面奶', '护手霜'],
    defaultPriceRange: [20, 250],

    conditionTips: ['开封类务必写清余量与生产/到期信息', '敏感肤质建议先沟通'],
  },
  {
    id: 'baby', name: '母婴', icon: '🍼',
    keywords: ['婴儿', '宝宝', '奶瓶', '推车', '纸尿裤', '童装', '玩具', '绘本', '安全座椅', '吸奶器', '妈咪包', '儿童绘本', '儿童绘本套装', '婴儿床', '餐椅', '学步车', '婴儿背带', '积木', '早教机'],
    defaultPriceRange: [25, 500],

    conditionTips: ['涉及安全的物品建议当面看', '写明使用月份更放心'],
  },
  {
    id: 'home', name: '家居收纳', icon: '🏠',
    keywords: ['收纳', '架子', '衣柜', '桌', '椅', '灯', '窗帘', '床品', '被子', '枕头', '地毯', '置物', '厨房', '锅', '碗', '杯', '书桌', '餐桌', '电脑椅', '折叠椅', '沙发', '床垫', '台灯', '落地灯', '鞋柜', '收纳箱', '晾衣架'],
    defaultPriceRange: [20, 350],

    conditionTips: ['大件写明尺寸与能否拆装', '是否需自备工具'],
  },
  {
    id: 'book', name: '图书文娱', icon: '📚',
    keywords: ['书', '教材', '小说', '漫画', '杂志', '乐高', '模型', '手办', '卡牌', '黑胶', 'CD', '吉他', '尤克里里', '教辅', '考研资料', '词典', '字典', '百科全书', '桌游', '拼图', '电子琴'],
    defaultPriceRange: [10, 200],

    conditionTips: ['教材写清版次年份', '手办写清是否拆封'],
  },
  {
    id: 'sport', name: '运动户外', icon: '🏃',
    keywords: ['跑步', '健身', '哑铃', '瑜伽', '球拍', '篮球', '足球', '自行车', '帐篷', '登山', '滑板', '泳镜', '护膝', '羽毛球拍', '网球拍', '乒乓球拍', '动感单车', '跑步机', '睡袋', '登山包', '露营椅', '天幕', '轮滑鞋', '飞盘'],
    defaultPriceRange: [30, 600],

    conditionTips: ['写明规格/重量档位', '户外装备说明防水或磨损点'],
  },
]

export const OTHER = {
  id: 'other', name: '其他闲置', icon: '📦',
  keywords: [],
  defaultPriceRange: [20, 200],

  conditionTips: ['把品名、成色、附件写清楚即可'],
}

export const CONDITIONS = [
  { id: 'almost_new', label: '几乎全新', mult: 0.75 },
  { id: 'nine', label: '九成新', mult: 0.55 },
  { id: 'eight', label: '八成新', mult: 0.4 },
  { id: 'seven', label: '七成新及以下', mult: 0.25 },
]

export const EXAMPLES = [
  {
    label: '耳机 AirPods',
    desc: '自用闲置 Apple AirPods Pro 2 蓝牙降噪耳机，USB-C 充电盒，用了八个月，耳机和充电盒有轻微细痕，附原装盒和替换耳塞',
    conditionId: 'nine', purchasePrice: '1899', usedMonths: '8', brandModel: 'Apple AirPods Pro 2', city: '杭州',
  },
  {
    label: '儿童绘本套装',
    desc: '闲置儿童绘本套装 30 册，适合 3–6 岁，亲子共读用过一年，部分书角有折痕，其中两本内页有涂画，整套转让',
    conditionId: 'eight', purchasePrice: '268', usedMonths: '12', brandModel: '', city: '广州',
  },
  {
    label: '空气炸锅',
    desc: '美的空气炸锅 3.5L，买来做减脂餐用了几个月，现在基本吃食堂就闲置了，功能正常，有轻微使用痕迹',
    conditionId: 'nine', purchasePrice: '299', usedMonths: '5', brandModel: '美的 3.5L', city: '海口',
  },
  {
    label: 'Switch',
    desc: '任天堂 Switch 日版，含原装手柄和充电底座，玩了一年多，屏幕无坏点，外壳有细微磨损',
    conditionId: 'eight', purchasePrice: '2200', usedMonths: '14', brandModel: 'Nintendo Switch', city: '海口',
  },
  {
    label: '羽绒服',
    desc: '优衣库轻薄羽绒服 M 码，黑色，冬天穿了两季，无破洞无油渍，水洗过，因换厚款出',
    conditionId: 'eight', purchasePrice: '499', usedMonths: '18', brandModel: '优衣库 M', city: '海口',
  },
  {
    label: '跑步鞋',
    desc: '耐克跑步鞋 42 码，公路跑大概三百公里，鞋底还有纹路，鞋面干净，换新鞋了所以出',
    conditionId: 'seven', purchasePrice: '699', usedMonths: '10', brandModel: 'Nike 42', city: '海口',
  },
]

const HYPE = [
  [/绝对/g, '整体'], [/史上/g, '近期'], [/必买/g, '值得看看'], [/完美/g, '状况不错'],
  [/无敌/g, '比较能打'], [/爆款/g, '常见款'], [/原价上千/g, '入手时价格不低'],
]

const GENERIC = ['闲置', '自用', '转让', '出', '便宜', '九成新', '八成新']

export function detectCategory(text = '') {
  const normalized = text.toLowerCase()
  const scores = CATEGORIES.map((c) => {
    let score = 0
    for (const kw of c.keywords) {
      if (normalized.includes(kw.toLowerCase())) score += kw.length >= 3 ? 3 : 2
      if (GENERIC.includes(kw)) score -= 1
    }
    return { cat: c, score }
  })
  scores.sort((a, b) => b.score - a.score)
  if (!scores[0] || scores[0].score <= 0) return { cat: OTHER, score: 0 }
  return scores[0]
}

function soften(text) {
  let t = text
  let n = 0
  for (const [re, to] of HYPE) {
    const before = t
    t = t.replace(re, to)
    if (t !== before) n += 1
  }
  return { text: t, softened: n }
}

function pickCondition(id) {
  return CONDITIONS.find((c) => c.id === id) || CONDITIONS[1]
}

function roundPrice(n) {
  if (n < 20) return Math.max(5, Math.round(n))
  if (n < 100) return Math.round(n / 5) * 5
  if (n < 500) return Math.round(n / 10) * 10
  return Math.round(n / 20) * 20
}

export function suggestPrice({ purchasePrice, conditionId, category }) {
  const cond = pickCondition(conditionId)
  const purchase = Number(purchasePrice)
  let low, high
  if (Number.isFinite(purchase) && purchase > 0) {
    low = roundPrice(purchase * cond.mult * 0.85)
    high = roundPrice(purchase * cond.mult * 1.05)
  } else {
    const [d0, d1] = category.defaultPriceRange
    low = roundPrice(d0 * (cond.mult / 0.55))
    high = roundPrice(d1 * (cond.mult / 0.55))
  }
  if (high < low) high = low
  return {
    low, high,
    note: '仅供参考，非市场实价（本地启发式估算，请结合同城成色自行调整）',
  }
}

// 本地语气模板：只调整表达，不替用户补充物品状况或交易承诺。
export const STYLES = [
  { id: 'concise', label: '简洁', hint: '重点清楚，快速浏览' },
  { id: 'friendly', label: '亲切', hint: '自然交流，温和有礼' },
]

const TONES = {
  concise: {
    condition: (label, desc) => '成色：' + label + '。物品描述：' + desc,
    duration: (months) => '使用时长约 ' + months + ' 个月',
    model: (brand) => '品牌 / 规格：' + brand,
    detail: (text) => '细节：' + text,
    followup: '瑕疵、维修史与配件情况请在发布前逐项核实。',
    price: (range) => '参考价：¥' + range.low + '–' + range.high + '。仅供参考，非市场实价；由本地规则估算，成交价另行协商。',
    trade: (city) => (city ? '所在城市：' + city + '。' : '') + '交易方式、运费及验货安排请先协商。建议平台内沟通与交易，勿点击站外陌生链接或扫描不明二维码。',
    pointsHeading: '物品信息',
  },
  friendly: {
    condition: (label, desc) => '这件物品的成色按「' + label + '」描述。具体情况和你说清楚：' + desc,
    duration: (months) => '已经使用约 ' + months + ' 个月，供你参考',
    model: (brand) => '想了解品牌和规格的话，是 ' + brand,
    detail: (text) => '这些细节也可以先看看：' + text,
    followup: '发布前记得再核实瑕疵、维修史和配件情况，写清楚更方便彼此了解。',
    price: (range) => '这件物品的参考价是 ¥' + range.low + '–' + range.high + '，可以作为聊价格的起点。仅供参考，非市场实价，是本地规则估算的哦；具体成交价再商量。',
    trade: (city) => (city ? '物品在' + city + '，' : '') + '见面还是邮寄、运费和验货怎么安排，都请提前聊好。为了交易安心，请留在平台内沟通与交易，不要点击站外陌生链接或扫描不明二维码。',
    pointsHeading: '先看看这些信息',
  },
}

const BRANDS = ['Apple', '苹果', '华为', '小米', '荣耀', '三星', '索尼', '佳能', '尼康', '联想', '戴尔', '惠普', '华硕', '美的', '苏泊尔', '九阳', '海尔', '格力', '松下', '飞利浦', '戴森', '任天堂', 'Nintendo', '优衣库', 'Nike', '耐克', '阿迪达斯', '宜家', '费雪', '乐高']
const BRAND_WORDS = new Set(BRANDS.map((brand) => brand.toLowerCase()))
const ITEM_WORDS = [...new Set(['跑步鞋', '儿童绘本套装', ...CATEGORIES.flatMap((cat) => cat.keywords)])]
  .filter((word) => !BRAND_WORDS.has(word.toLowerCase()))
  .sort((a, b) => b.length - a.length)
const contains = (text, part) => text.toLowerCase().replace(/\s+/g, '').includes(part.toLowerCase().replace(/\s+/g, ''))
const chars = (text) => Array.from(text)
const short = (text, limit) => chars(text).slice(0, limit).join('').trim()

function cleanTitle(text) {
  return soften(text).text
    .replace(/(?:个人|家中)?自用|闲置|转让|低价出|便宜出|诚心出|出手/g, '')
    .replace(/(?:几乎全新|九成新|八成新|七成新)/g, '')
    .replace(/[，。！？、,：:;；!？?\n]+/g, ' ')
    .replace(/\s+/g, ' ').trim()
}

function makeTitle(desc, brandModel, condition) {
  const cleaned = cleanTitle(desc)
  const explicit = cleanTitle(brandModel)
  const search = explicit + ' ' + cleaned
  const item = ITEM_WORDS.find((word) => contains(search, word))
    || cleaned.split(/买来|用了|使用|因为|现在|买了|购于|有|含/)[0].trim()
    || '二手物品'
  // 型号优先取用户明确填写的内容，其次从描述识别常见系列或品牌。
  const series = cleaned.match(/(?:AirPods(?:\s+Pro)?(?:\s*\d)?|iPhone\s*\d+(?:\s*Pro)?(?:\s*Max)?|MacBook(?:\s+Air|\s+Pro)?|iPad(?:\s+Air|\s+Pro|\s+mini)?|Switch|Kindle)/i)?.[0]
  const brand = BRANDS.find((word) => contains(cleaned, word)) || ''
  let identity = explicit || [brand, series].filter((word, i, all) => word && !all.slice(0, i).some((previous) => contains(previous, word))).join(' ')
  const foundSpecs = [...cleaned.matchAll(/\d+(?:\.\d+)?\s*(?:TB|GB|MB|mAh|[mM][lL]|[lL]|升|寸|英寸|公斤|kg|码|册|本|件|cm)|\b(?:XXL|XL|XS|S|M|L)\b/gi)]
    .map((match) => match[0].replace(/\s+/g, ''))
  // 型号栏里已有裸尺码时，补上单位，避免出现“42 42码”。
  for (const value of foundSpecs) {
    const number = value.match(/^\d+(?:\.\d+)?/)?.[0]
    if (number) identity = identity.replace(new RegExp('(^|\\s)' + number.replace('.', '\\.') + '(?=\\s|$)'), '$1' + value)
  }
  const specs = foundSpecs
    .filter((spec, i, all) => all.indexOf(spec) === i && !contains(identity, spec) && !contains(item, spec))
    .slice(0, 2)
  let core = short(item, 14)
  let spec = specs.join(' ')
  // 过长时先舍弃次要规格，再缩短品牌型号，始终为品名保留位置。
  if (chars([identity, spec, contains(identity, core) ? '' : core].filter(Boolean).join(' ')).length > 28) spec = ''
  if (chars(identity).length > 28 - chars(core).length - 1) {
    identity = identity.replace(new RegExp(core.replace(/[.*+?^$(){}|[\]\\]/g, '\\$&'), 'gi'), '').trim()
    identity = short(identity, 28 - chars(core).length - 1)
  }
  let title = [identity, spec, contains(identity, core) ? '' : core].filter(Boolean).join(' ')
  if (chars(title + ' ' + condition).length <= 28) title += ' ' + condition
  return short(title, 28)
}

export function buildListing(form) {
  const rawDesc = (form.desc || '').trim()
  const { text: desc, softened } = soften(rawDesc)
  const brand = (form.brandModel || '').trim()
  const detected = form.categoryId
    ? { cat: [...CATEGORIES, OTHER].find((c) => c.id === form.categoryId) || OTHER, score: 1 }
    : detectCategory(rawDesc + ' ' + brand)
  const cat = detected.cat
  const cond = pickCondition(form.conditionId)
  const styleId = STYLES.some((style) => style.id === form.styleId) ? form.styleId : 'concise'
  const tone = TONES[styleId]
  const price = suggestPrice({ purchasePrice: form.purchasePrice, conditionId: cond.id, category: cat })
  const title = makeTitle(rawDesc, brand, cond.label)
  const months = Number(form.usedMonths)
  const hasDuration = form.usedMonths !== '' && form.usedMonths != null && Number.isFinite(months) && months >= 0
  const points = [styleId === 'friendly' ? '成色按「' + cond.label + '」描述，供你了解' : '成色：' + cond.label]
  if (brand) points.push(tone.model(soften(brand).text))
  if (hasDuration) points.push(tone.duration(months))
  // 仅提取用户已经描述的细节，不自动声称无瑕疵、功能正常或配件齐全。
  const details = desc.split(/[，。；;\n]+/).map((part) => part.trim())
    .filter((part) => /痕|磨损|破|污|折|涂|缺|配件|原装|附|含|功能|正常|维修|进水|余量|到期|开封/.test(part))
    .slice(0, 3)
  points.push(...details.map(tone.detail))
  const conditionNotes = [tone.condition(cond.label, desc), hasDuration ? tone.duration(months) + '。' : '', tone.followup].filter(Boolean).join('\n')
  const priceCopy = tone.price(price)
  const transactionTips = tone.trade((form.city || '').trim())
  const tips = [
    ...cat.conditionTips,
    '标题优先保留品牌、规格和品名，控制在 28 字以内，方便搜索',
    '参考价仅供参考，非市场实价；请结合物品状况自行调整',
  ]
  const fullCopy = [
    '【' + title + '】', priceCopy, '', tone.pointsHeading + '：',
    ...points.map((point, i) => (i + 1) + '. ' + point), '',
    '成色说明：\n' + conditionNotes, '', '交易提示：\n' + transactionTips,
  ].join('\n')
  return {
    cat, condition: cond, styleId, title, sellingPoints: points, conditionNotes,
    priceRange: price, priceCopy, transactionTips, fullCopy, tips, softened,
  }
}
