/** 真太阳时地点：省市/区县假数据（演示经度，用于真太阳时校正交互） */

export type Place = {
  id: string
  /** 展示名：广州 / 越秀区 */
  name: string
  /** 所属城市，便于搜索与分组 */
  city: string
  country: string
  lng: number
  utc: number
  kind: 'city' | 'district'
}

const DISTRICTS: Record<string, { name: string; lng: number }[]> = {
  北京: [
    { name: '东城区', lng: 116.42 }, { name: '西城区', lng: 116.37 }, { name: '朝阳区', lng: 116.49 },
    { name: '海淀区', lng: 116.31 }, { name: '丰台区', lng: 116.29 }, { name: '石景山区', lng: 116.22 },
    { name: '通州区', lng: 116.66 }, { name: '昌平区', lng: 116.23 }, { name: '大兴区', lng: 116.34 },
  ],
  上海: [
    { name: '黄浦区', lng: 121.49 }, { name: '徐汇区', lng: 121.44 }, { name: '长宁区', lng: 121.42 },
    { name: '静安区', lng: 121.45 }, { name: '普陀区', lng: 121.40 }, { name: '虹口区', lng: 121.51 },
    { name: '杨浦区', lng: 121.53 }, { name: '浦东新区', lng: 121.54 }, { name: '闵行区', lng: 121.38 },
  ],
  广州: [
    { name: '越秀区', lng: 113.27 }, { name: '荔湾区', lng: 113.24 }, { name: '海珠区', lng: 113.32 },
    { name: '天河区', lng: 113.36 }, { name: '白云区', lng: 113.27 }, { name: '黄埔区', lng: 113.46 },
    { name: '番禺区', lng: 113.38 }, { name: '花都区', lng: 113.22 }, { name: '南沙区', lng: 113.53 },
  ],
  深圳: [
    { name: '罗湖区', lng: 114.13 }, { name: '福田区', lng: 114.06 }, { name: '南山区', lng: 113.93 },
    { name: '宝安区', lng: 113.88 }, { name: '龙岗区', lng: 114.25 }, { name: '龙华区', lng: 114.04 },
    { name: '盐田区', lng: 114.24 }, { name: '坪山区', lng: 114.35 },
  ],
  杭州: [
    { name: '上城区', lng: 120.17 }, { name: '拱墅区', lng: 120.14 }, { name: '西湖区', lng: 120.13 },
    { name: '滨江区', lng: 120.21 }, { name: '萧山区', lng: 120.27 }, { name: '余杭区', lng: 120.30 },
    { name: '临平区', lng: 120.30 }, { name: '钱塘区', lng: 120.49 },
  ],
  南京: [
    { name: '玄武区', lng: 118.80 }, { name: '秦淮区', lng: 118.79 }, { name: '建邺区', lng: 118.73 },
    { name: '鼓楼区', lng: 118.77 }, { name: '栖霞区', lng: 118.91 }, { name: '雨花台区', lng: 118.78 },
    { name: '江宁区', lng: 118.84 }, { name: '浦口区', lng: 118.63 },
  ],
  苏州: [
    { name: '姑苏区', lng: 120.62 }, { name: '虎丘区', lng: 120.57 }, { name: '吴中区', lng: 120.63 },
    { name: '相城区', lng: 120.64 }, { name: '吴江区', lng: 120.65 }, { name: '工业园区', lng: 120.73 },
  ],
  成都: [
    { name: '锦江区', lng: 104.08 }, { name: '青羊区', lng: 104.06 }, { name: '金牛区', lng: 104.05 },
    { name: '武侯区', lng: 104.04 }, { name: '成华区', lng: 104.10 }, { name: '龙泉驿区', lng: 104.27 },
    { name: '双流区', lng: 103.92 }, { name: '温江区', lng: 103.85 },
  ],
  重庆: [
    { name: '渝中区', lng: 106.57 }, { name: '江北区', lng: 106.57 }, { name: '南岸区', lng: 106.64 },
    { name: '沙坪坝区', lng: 106.46 }, { name: '九龙坡区', lng: 106.51 }, { name: '渝北区', lng: 106.63 },
    { name: '巴南区', lng: 106.54 }, { name: '北碚区', lng: 106.44 },
  ],
  武汉: [
    { name: '江岸区', lng: 114.31 }, { name: '江汉区', lng: 114.27 }, { name: '硚口区', lng: 114.22 },
    { name: '汉阳区', lng: 114.22 }, { name: '武昌区', lng: 114.32 }, { name: '青山区', lng: 114.39 },
    { name: '洪山区', lng: 114.34 }, { name: '东湖高新区', lng: 114.42 },
  ],
}

const CITY_LNG: Record<string, number> = {
  北京: 116.41, 上海: 121.47, 广州: 113.26, 深圳: 114.06, 杭州: 120.16,
  南京: 118.80, 苏州: 120.59, 成都: 104.07, 重庆: 106.55, 武汉: 114.31,
}

export const DEFAULT_CITY_NAMES = Object.keys(CITY_LNG)

export const ALL_PLACES: Place[] = DEFAULT_CITY_NAMES.flatMap((city) => {
  const cityPlace: Place = {
    id: `city-${city}`,
    name: city,
    city,
    country: '中国',
    lng: CITY_LNG[city],
    utc: 8,
    kind: 'city',
  }
  const cityAlias: Place = {
    id: `city-full-${city}`,
    name: `${city}市`,
    city,
    country: '中国',
    lng: CITY_LNG[city],
    utc: 8,
    kind: 'city',
  }
  const districts = (DISTRICTS[city] ?? []).map((d) => ({
    id: `dist-${city}-${d.name}`,
    name: d.name,
    city,
    country: '中国',
    lng: d.lng,
    utc: 8,
    kind: 'district' as const,
  }))
  return [cityPlace, cityAlias, ...districts]
})

/** 默认列表：仅市级 */
export const DEFAULT_PLACES = ALL_PLACES.filter((p) => p.kind === 'city' && !p.name.endsWith('市'))

export function searchPlaces(query: string): Place[] {
  const q = query.trim()
  if (!q) return DEFAULT_PLACES

  const matched = ALL_PLACES.filter(
    (p) =>
      p.name.includes(q)
      || p.city.includes(q)
      || `${p.city}${p.name}`.includes(q)
      || `${p.name}${p.country}`.includes(q),
  )

  // 搜索某市时：市本体 + 该市下的区排在前面
  const cityHit = DEFAULT_CITY_NAMES.find((c) => c.includes(q) || q.includes(c))
  if (cityHit) {
    const cityLevel = matched.filter((p) => p.city === cityHit && p.kind === 'city')
    const districts = matched.filter((p) => p.city === cityHit && p.kind === 'district')
    const others = matched.filter((p) => p.city !== cityHit)
    // 去重：同名市只留一条不带「市」的优先
    const seen = new Set<string>()
    const dedupe = (list: Place[]) =>
      list.filter((p) => {
        const key = `${p.kind}-${p.name}-${p.lng}`
        if (seen.has(key)) return false
        seen.add(key)
        return true
      })
    return dedupe([...cityLevel, ...districts, ...others]).slice(0, 24)
  }

  const seen = new Set<string>()
  return matched
    .filter((p) => {
      const key = `${p.kind}-${p.name}-${p.lng}`
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
    .slice(0, 24)
}

export function lngLabel(lng: number): string {
  return `${lng.toFixed(2)}°E`
}

export function findNearestPlace(lng: number, lat?: number): Place {
  void lat
  let best = DEFAULT_PLACES[0]
  let bestD = Infinity
  for (const p of DEFAULT_PLACES) {
    const d = Math.abs(p.lng - lng)
    if (d < bestD) {
      bestD = d
      best = p
    }
  }
  return best
}
