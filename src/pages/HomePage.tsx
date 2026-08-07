import { useEffect, useMemo, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { HexLines } from '@/components/HexLines'
import { classics } from '@/data/classics'
import { dailyHexagram } from '@/lib/liuyao'
import { useLang } from '@/lib/i18n'
import { publicAsset } from '@/lib/publicAsset'

const hotTools = [
  {
    image: publicAsset('/home/tools/bazi.jpg'),
    mobileImage: publicAsset('/home/optimized/tools/bazi-mobile.webp'),
    zh: '八字排盘',
    en: 'BaZi Chart',
    introZh: '看见先天结构',
    introEn: 'Read your underlying structure',
  },
  {
    image: publicAsset('/home/tools/ziwei.jpg'),
    mobileImage: publicAsset('/home/optimized/tools/ziwei-mobile.webp'),
    zh: '紫微斗数',
    en: 'Zi Wei Dou Shu',
    introZh: '读懂人生宫位',
    introEn: 'Understand the twelve palaces',
  },
  {
    image: publicAsset('/home/tools/liuyao.jpg'),
    mobileImage: publicAsset('/home/optimized/tools/liuyao-mobile.webp'),
    zh: '六爻问卦',
    en: 'Liu Yao',
    introZh: '回应当下疑问',
    introEn: 'Ask one question about now',
  },
  {
    image: publicAsset('/home/tools/tarot.jpg'),
    mobileImage: publicAsset('/home/optimized/tools/tarot-mobile.webp'),
    zh: '塔罗牌阵',
    en: 'Tarot',
    introZh: '照见此刻心境',
    introEn: 'Reflect the present moment',
  },
]

const classicImages: Record<string, string> = {
  zhouyi: publicAsset('/home/classics/zhouyi.jpg'),
  yizhuan: publicAsset('/home/classics/yizhuan.jpg'),
  meihua: publicAsset('/home/classics/meihua.jpg'),
  zengshan: publicAsset('/home/classics/zengshan.jpg'),
  bushizhengzong: publicAsset('/home/classics/bushizhengzong.jpg'),
  huangjince: publicAsset('/home/classics/huangjince.jpg'),
}

const classicMobileImages: Record<string, string> = {
  zhouyi: publicAsset('/home/optimized/classics/zhouyi-mobile.webp'),
  yizhuan: publicAsset('/home/optimized/classics/yizhuan-mobile.webp'),
  meihua: publicAsset('/home/optimized/classics/meihua-mobile.webp'),
  zengshan: publicAsset('/home/optimized/classics/zengshan-mobile.webp'),
  bushizhengzong: publicAsset('/home/optimized/classics/bushizhengzong-mobile.webp'),
  huangjince: publicAsset('/home/optimized/classics/huangjince-mobile.webp'),
}

const intentOptions = [
  { zh: '我想看自己', en: 'Understand myself' },
  { zh: '我想看关系', en: 'Read a relationship' },
  { zh: '我想问当下', en: 'Ask about now' },
  { zh: '我想查日子', en: 'Check a date' },
  { zh: '我想学知识', en: 'Learn the system' },
]

const WEEK_ZH = ['日', '一', '二', '三', '四', '五', '六']
const WEEK_EN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

gsap.registerPlugin(useGSAP, ScrollTrigger)

export function HomePage() {
  const { t, lang } = useLang()
  const daily = useMemo(() => dailyHexagram(), [])
  const [dailyOpen, setDailyOpen] = useState(false)
  const homeRef = useRef<HTMLDivElement>(null)
  const classicSectionRef = useRef<HTMLElement>(null)
  const classicTrackRef = useRef<HTMLDivElement>(null)
  const today = new Date()
  const dateLabel =
    lang === 'en'
      ? `${WEEK_EN[today.getDay()]}, ${today.toLocaleString('en-US', { month: 'short' })} ${today.getDate()}, ${today.getFullYear()}`
      : `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日 星期${WEEK_ZH[today.getDay()]}`

  useEffect(() => {
    const section = classicSectionRef.current
    const track = classicTrackRef.current
    if (!section || !track) return

    const mobile = window.matchMedia('(max-width: 940px)')
    let frame = 0

    const render = () => {
      frame = 0
      if (mobile.matches) {
        section.style.removeProperty('height')
        track.style.removeProperty('transform')
        return
      }

      const distance = Math.max(0, track.scrollWidth - window.innerWidth)
      section.style.height = `${window.innerHeight + distance}px`
      const rect = section.getBoundingClientRect()
      const travel = section.offsetHeight - window.innerHeight
      const progress = travel > 0 ? Math.min(1, Math.max(0, -rect.top / travel)) : 0
      track.style.transform = `translate3d(${-progress * distance}px, 0, 0)`
    }

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(render)
    }

    render()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    mobile.addEventListener('change', render)

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      mobile.removeEventListener('change', render)
    }
  }, [])

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      const sections = gsap.utils.toArray<HTMLElement>('.fate-motion-section')
      sections.forEach((section) => {
        const revealLayers = section.querySelectorAll<HTMLElement>('[data-reveal]')
        if (!revealLayers.length) return
        const isDailySection = section.id === 'daily'

        gsap.fromTo(
          revealLayers,
          { autoAlpha: 0, y: 48 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1.05,
            stagger: 0.13,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: isDailySection ? revealLayers[0] : section,
              start: isDailySection ? 'top bottom' : 'top 76%',
              once: true,
            },
          },
        )
      })

      gsap.fromTo(
        '.fate-classics-sticky',
        {
          y: () => Math.min(220, window.innerHeight * 0.28),
          filter: 'brightness(0.86)',
        },
        {
          y: 0,
          filter: 'brightness(1)',
          ease: 'none',
          scrollTrigger: {
            trigger: '.fate-classics',
            start: 'top 94%',
            end: 'top 34%',
            scrub: 0.9,
            invalidateOnRefresh: true,
          },
        },
      )

      const toolEntries = gsap.utils.toArray<HTMLElement>('.fate-tool-entry')
      toolEntries.forEach((entry, index) => {
        const visual = entry.querySelector<HTMLElement>('.fate-tool-visual')
        const copyWrap = entry.querySelector<HTMLElement>('.fate-tool-copy')
        const copy = entry.querySelectorAll<HTMLElement>('.fate-tool-copy > *')
        if (!visual || !copyWrap) return

        const reveal = gsap.timeline({
          scrollTrigger: {
            trigger: entry,
            start: 'top 82%',
            once: true,
          },
        })

        reveal.fromTo(
          visual,
          {
            autoAlpha: 0.36,
            scale: 0.9,
            rotate: index % 2 === 0 ? -14 : 14,
            filter: 'brightness(0.76)',
          },
          {
            autoAlpha: 1,
            scale: 1,
            rotate: index % 2 === 0 ? -7 : 7,
            filter: 'brightness(1)',
            duration: 1.15,
            ease: 'power3.out',
          },
          0,
        )
        reveal.fromTo(
          copy,
          { autoAlpha: 0, y: 42 },
          { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.14, ease: 'power3.out' },
          0.16,
        )

        gsap.fromTo(
          visual,
          { yPercent: -9 },
          {
            yPercent: 11,
            ease: 'none',
            scrollTrigger: {
              trigger: entry,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.9,
            },
          },
        )

        gsap.fromTo(
          copyWrap,
          { yPercent: 14 },
          {
            yPercent: -12,
            ease: 'none',
            scrollTrigger: {
              trigger: entry,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.1,
            },
          },
        )
      })

      gsap.to('.fate-marquee-track', {
        xPercent: -50,
        duration: 24,
        repeat: -1,
        ease: 'none',
      })
    },
    { scope: homeRef },
  )

  useGSAP(
    () => {
      if (!dailyOpen || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      gsap.fromTo(
        '.fate-daily-detail > *',
        { autoAlpha: 0, y: 38 },
        { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.11, ease: 'power3.out' },
      )
    },
    { scope: homeRef, dependencies: [dailyOpen] },
  )

  return (
    <div className="fate-home" ref={homeRef}>
      <section className="hero">
        <div className="hero-bg" aria-hidden>
          <picture>
            <source media="(max-width: 640px)" srcSet={publicAsset('/home/optimized/hero-mobile.webp')} type="image/webp" />
            <img
              src={publicAsset('/home/optimized/hero-desktop.webp')}
              alt=""
              width="1920"
              height="820"
              fetchPriority="high"
              decoding="async"
            />
          </picture>
        </div>
        <div className="hero-inner">
          <h1 className="hero-title">{t('不问注定，只问此刻该怎么走。', 'Not fate, but the next right move.')}</h1>
          <p className="hero-sub">MMEETT FATE</p>
          <p className="hero-desc">
            {t(
              '八字、紫微、六爻、塔罗——二十八种东方推演法门，收进一座云台。说出你的问题，我们告诉你哪种问法最合适。',
              'Bazi, Zi Wei, hexagrams and tarot gather in one field. Tell us the question, and we guide you to the right method.',
            )}
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#daily">
              ▶ {t('Start', 'Start')}
            </a>
          </div>
        </div>
      </section>

      <section className={`fate-daily fate-motion-section ${dailyOpen ? 'is-open' : ''}`} id="daily">
        <div className="fate-daily-intro">
          <span className="fate-section-tag" data-reveal>DAILY HEXAGRAM</span>
          <h2 data-reveal>{t('每日一卦', 'Daily Hexagram')}</h2>
          <p data-reveal>{t('每天固定一卦，当天结果不变——早晨看一眼，心里有个底。', 'One fixed hexagram each day, so the result remains steady.')}</p>
          <span className="fate-daily-date" data-reveal>{dateLabel}</span>
          <button type="button" className="fate-reveal-button" data-reveal onClick={() => setDailyOpen((open) => !open)}>
            {dailyOpen ? t('收起今日卦象', 'Hide today’s reading') : t('✦ 揭晓今日卦象', 'Reveal today’s reading')}
          </button>

          {dailyOpen ? (
            <div className="fate-gua-reveal">
              <div className="fate-gua-card">
                <HexLines lines={daily.lines} />
                <strong>{daily.ben.name}</strong>
                <span>
                  {t('上', 'upper')}
                  {lang === 'en' ? daily.ben.upper.nameEn : daily.ben.upper.name}
                  {t('下', 'lower')}
                  {lang === 'en' ? daily.ben.lower.nameEn : daily.ben.lower.name}
                </span>
              </div>
            </div>
          ) : null}
        </div>

        {dailyOpen ? (
          <div className="fate-daily-detail" aria-live="polite">
            <span className="fate-section-tag">{t('今日详解', 'TODAY’S READING')}</span>
            <h3>{t('增益之日，主动有得', 'A day for active progress')}</h3>
            <p>
              <strong>{t('风雷相助，外力正当。', 'Wind and thunder move together.')}</strong>
              {t(
                '今天开口求助、推进合作、启动拖延已久的事，都容易得到回应；而独自决断、按兵不动，则容易错过送上门的助力。',
                'Ask for help, move a collaboration forward, or restart something delayed. Acting alone may miss support already within reach.',
              )}
            </p>
            <div className="fate-daily-chips">
              <span className="is-good">{t('合作', 'Collaborate')}</span>
              <span className="is-good">{t('求助', 'Ask')}</span>
              <span className="is-good">{t('开启', 'Begin')}</span>
              <span className="is-warn">{t('独断', 'Go alone')}</span>
              <span className="is-warn">{t('拖延', 'Delay')}</span>
            </div>
            <span className="fate-gold-button" aria-disabled="true">
              {t('卦辞解读', 'Read the hexagram')}
            </span>
          </div>
        ) : null}
      </section>

      <section className="fate-classics fate-motion-section" ref={classicSectionRef}>
        <div className="fate-classics-sticky">
          <header className="fate-classics-head">
            <span className="fate-section-tag" data-reveal>CLASSICS · {t('古籍书楼', 'CLASSIC LIBRARY')}</span>
            <h2 data-reveal>
              {t('阅读古籍，', 'Read the classics, ')}<em>{t('慢慢入局。', 'enter slowly.')}</em>
            </h2>
          </header>
          <div className="fate-classics-viewport">
            <div className="fate-classics-track" ref={classicTrackRef}>
              {classics.slice(0, 6).map((book) => (
                <article className="fate-classic-card" tabIndex={0} key={book.id}>
                  <div className="fate-classic-inner">
                    <div className="fate-classic-face fate-classic-front">
                      <picture>
                        <source media="(max-width: 640px)" srcSet={classicMobileImages[book.id]} type="image/webp" />
                        <img src={classicImages[book.id]} alt="" loading="lazy" decoding="async" width="700" height="1080" />
                      </picture>
                      <div className="fate-classic-meta">
                        <h3>{book.title}</h3>
                        <p>{book.dynasty} · {book.author}</p>
                        <span>{book.tools}</span>
                      </div>
                    </div>
                    <div className="fate-classic-face fate-classic-back">
                      <h3>{book.title}</h3>
                      <small>{book.dynasty} · {book.author}</small>
                      <p>{book.brief}</p>
                      <div className="fate-topic-list">
                        {book.topics.split('、').slice(0, 3).map((topic) => <span key={topic}>{topic}</span>)}
                      </div>
                      <strong>{t('去古籍书楼读 →', 'Read in the library →')}</strong>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <span className="fate-classics-tip">SCROLL ↓ · {t('横向翻阅古籍', 'Browse the shelf')}</span>
        </div>
      </section>

      <section className="fate-hot fate-motion-section" id="hot">
        <header className="fate-centered-head">
          <span className="fate-section-tag" data-reveal>HOT · {t('热门推演', 'POPULAR READINGS')}</span>
          <h2 data-reveal>{t('更多的工具', 'More tools')}</h2>
        </header>
        <div className="fate-tool-showcase">
          {hotTools.map((tool) => (
            <article className="fate-tool-entry" key={tool.zh}>
              <div className="fate-tool-visual">
                <picture>
                  <source media="(max-width: 640px)" srcSet={tool.mobileImage} type="image/webp" />
                  <img src={tool.image} alt="" loading="lazy" decoding="async" width="780" height="1040" />
                </picture>
              </div>
              <div className="fate-tool-copy">
                <h3>{lang === 'en' ? tool.en : tool.zh}</h3>
                <p>{lang === 'en' ? tool.introEn : tool.introZh}</p>
              </div>
            </article>
          ))}
        </div>
        <span className="fate-outline-button" data-reveal aria-disabled="true">{t('更多工具', 'More tools')}</span>
      </section>

      <div className="fate-marquee" aria-hidden="true">
        <div className="fate-marquee-track">
          <span>{t('八字 · 紫微 · 六爻 · 塔罗 · 看见结构 · 回应当下 · ', 'BAZI · ZI WEI · LIU YAO · TAROT · READ THE PATTERN · ')}</span>
          <span>{t('八字 · 紫微 · 六爻 · 塔罗 · 看见结构 · 回应当下 · ', 'BAZI · ZI WEI · LIU YAO · TAROT · READ THE PATTERN · ')}</span>
        </div>
      </div>

      <section className="fate-questions fate-motion-section">
        <div className="fate-question-wrap">
          <h2 data-reveal>{t('问题', 'Questions')}</h2>
          <div className="fate-question-list">
            {intentOptions.map((option) => (
              <div key={option.zh} className="fate-question-row" data-reveal>
                <span className="fate-question-text">{lang === 'en' ? option.en : option.zh}</span>
                <span aria-hidden>+</span>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
