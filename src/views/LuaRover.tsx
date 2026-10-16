import { CaseStudyHero } from '../components/case-study/CaseStudyHero'
import { BulletList } from '../components/case-study/BulletList'
import { Section } from '../components/case-study/Section'
import { CardGrid } from '../components/case-study/CardGrid'
import { StatsRow } from '../components/case-study/StatsRow'
import { SplitMediaSection } from '../components/case-study/SplitMediaSection'
import { MediaFigure } from '../components/case-study/MediaFigure'
import { FigureGrid } from '../components/case-study/FigureGrid'
import { DeviceGallery } from '../components/case-study/DeviceGallery'
import { CodeBlock } from '../components/case-study/CodeBlock'
import { Paragraphs } from '../components/case-study/Paragraphs'
import { imageFolder, withBase } from '../lib/paths'
import {
  objectives,
  marketGapParagraph,
  highlightCards,
  seeItInActionParagraph,
  bridgeIntro,
  layersBlock,
  panicBlock,
  trampolineBlock,
  codegenBlock,
  missionCode,
  missionIntro,
  missionExplanation,
  engineParagraph,
  mobileParagraph,
  mobileArchitectureParagraph,
  mobileMenuParagraph,
  backendParagraph,
  contentBundleParagraph,
  refreshTokenParagraph,
  statsIntro,
  stats,
} from '../data/luaRover'
import './LuaRover.css'

const asset = imageFolder('lua-rover')

export function LuaRoverPage() {
  return (
    <div className="cs-page lua-rover-page">
      <CaseStudyHero
        eyebrow="LuaRover"
        title="Teaching real Lua by driving a rover"
        lead="LuaRover is an educational app that sits between block based tools and a bare code editor. A student writes actual Lua and every instruction moves a rover on a grid immediately, with the whole project running locally so it works on an old phone or with no internet connection at all."
        ctas={[
          { label: 'Back to projects', href: withBase('#all-projects'), variant: 'ghost' },
        ]}
        image={{ src: asset('hero-menu.jpg'), alt: 'LuaRover main menu' }}
      />

      <BulletList items={objectives} tone="subtle" tight />

      <Section title="Neither blocks nor bare code editors are quite right">
        <p>{marketGapParagraph}</p>
      </Section>

      <Section title="Three components, one experience">
        <CardGrid items={highlightCards} />
      </Section>

      <SplitMediaSection
        layout="stack"
        media={
          <MediaFigure
            src={asset('code-debugger.jpg')}
            alt="LuaRover code editor with the step debugger and sensors panel open"
          />
        }
      >
        <h2 id="see-it-in-action">The editor, the grid and the debugger, side by side</h2>
        <p>{seeItInActionParagraph}</p>
      </SplitMediaSection>

      <Section title="Where the actual engineering happens" lead={bridgeIntro}>
        <div className="cs-block-stack">
          <SplitMediaSection
            title={layersBlock.title}
            media={<MediaFigure src={asset(layersBlock.image)} alt={layersBlock.caption} caption={layersBlock.caption} />}
          >
            <Paragraphs items={layersBlock.paragraphs} />
          </SplitMediaSection>

          <SplitMediaSection
            title={panicBlock.title}
            reverse
            media={<MediaFigure src={asset(panicBlock.image)} alt={panicBlock.caption} caption={panicBlock.caption} />}
          >
            <Paragraphs items={panicBlock.paragraphs} />
          </SplitMediaSection>

          <SplitMediaSection
            title={trampolineBlock.title}
            layout="stack"
            textColumns={2}
            media={
              <FigureGrid
                items={[trampolineBlock.registerImage, trampolineBlock.invokeImage].map((image) => ({
                  src: asset(image.file),
                  alt: image.alt,
                  caption: image.alt,
                }))}
              />
            }
          >
            <Paragraphs items={trampolineBlock.paragraphs} />
          </SplitMediaSection>

          <SplitMediaSection
            title={codegenBlock.title}
            reverse
            media={<MediaFigure src={asset(codegenBlock.image)} alt={codegenBlock.caption} caption={codegenBlock.caption} />}
          >
            <Paragraphs items={codegenBlock.paragraphs} />
          </SplitMediaSection>
        </div>
      </Section>

      <Section title="What a student actually writes">
        <MediaFigure src={asset('a_real_mission_sample.jpg')} alt="LuaRover mission grid with sample tiles" tone="dark" />
        <SplitMediaSection matchTextHeight={false} media={<CodeBlock code={missionCode} label="Collect Every Sample" />}>
          <p>{missionIntro}</p>
          <p>{missionExplanation}</p>
        </SplitMediaSection>
      </Section>

      <Section title="A Flutter client that runs everywhere">
        <div className="cs-block-stack">
          <SplitMediaSection
            title="Recording every frame instead of re-running the script"
            media={<MediaFigure src={asset('game-engine.png')} alt="lua_rover game engine class diagram" />}
          >
            <p>{engineParagraph}</p>
          </SplitMediaSection>

          <SplitMediaSection
            title="Cross-platform from one codebase"
            layout="stack"
            textColumns={2}
            media={
              <DeviceGallery
                items={[
                  { src: asset('mobile-menu.jpg'), alt: 'LuaRover mobile debug view with the sensors panel', caption: 'Debug' },
                  { src: asset('mobile-code.jpg'), alt: 'LuaRover mobile code editor', caption: 'Code' },
                  { src: asset('mobile-map.jpg'), alt: 'LuaRover mobile grid map', caption: 'Map' },
                ]}
              />
            }
          >
            <p>{mobileParagraph}</p>
            <p>{mobileArchitectureParagraph}</p>
            <p>{mobileMenuParagraph}</p>
          </SplitMediaSection>
        </div>
      </Section>

      <Section title="What runs on the server" muted>
        <div className="cs-block-stack">
          <SplitMediaSection
            title="Clean Architecture, JWT, and packages generated for offline use"
            media={<MediaFigure src={asset('server-classes.png')} alt="LuaRoverBackend class diagram" />}
          >
            <p>{backendParagraph}</p>
            <p>{contentBundleParagraph}</p>
          </SplitMediaSection>

          <SplitMediaSection
            title="Refresh tokens you can revoke"
            reverse
            media={<MediaFigure src={asset('auth-login-flow.png')} alt="JWT login and refresh token sequence diagram" />}
          >
            <p>{refreshTokenParagraph}</p>
          </SplitMediaSection>
        </div>
      </Section>

      <Section title="What the test suites cover" lead={statsIntro}>
        <StatsRow items={stats} />
      </Section>
    </div>
  )
}
