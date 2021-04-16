import { BlogPost } from '../../components/BlogPost';

export default function Post() {
  return (
    <BlogPost>
      <p className='post'>
        <p>
          I had just bought my first RV 3 hours away from us and wanted to know
          everything about it before I had even seen it. The very same week I
          bought an RV, my fiancee surprised me with a late Christmas gift - a
          Remarkable 2! I was very amped about using my new toy to help with
          visualizing the electrical systems of my other new, much larger toy.
        </p>
        <p>
          When I first just rented an RV I was really frustrated by the lack of
          conceptual understanding I had for breaking shit. When you’re on shore
          power you can do this but not that. I mean it seems obvious looking
          back now: don’t draw more power from the system than it can handle.
          But it’s not all that. The lights and fridge can always be on while
          you’re actively living in it but why?
        </p>
        <p>
          Yearning to get to the root of all these assumed inert set of rules, I
          set out to find an explanation of the electrical system. What is
          connected to what and what are the limits on that thing? To seasoned
          RVer’s this is hard-wired knowledge.
        </p>
        <p>
          First I wanted to understand what was connected to what part. All RVs
          are different even if their identical models! So I went to my new RV’s
          manual.
        </p>
        <img
          src='/__next/pictures/01_28_2021/manual.png'
          className='img-fluid'
          alt='example manual page'
        />
        <p>
          In the normal, almost perfectly accurate manual, I highlighted
          sections where a certain appliance was referenced Now remember RVs are
          mobile houses, so the components are vast and even the manual will lie
          or guess. To really get the proper reference specs I thought to use
          the supplemental manual which is a composition of all components’
          manuals in one giant, ugly binder that has NO PAGE NUMBERs. Pretty
          frustrating. I guess this is one of the perks of reno-ing a whole
          ambulance or school bus - you know exactly what is inside it because
          you installed it or hired someone to. Ok, rant over. From the manual,
          I copied the components to a diagram.
        </p>
        <img
          src='/__next/pictures/01_28_2021/components.png'
          className='img-fluid'
          alt='drawing of components'
        />
        <p>
          To understand what was running off of house DC versus AC. Some
          components will run off DC and AC under circumstances. And some the
          car or house batteries all depending. Originally I thought the xantrax
          component is always an inverter which was wrong. Ours is an
          Inverter/Charger which is actually a switch/logic component, inverter,
          and converter. It’s hooked to not just convert DC to AC but actually
          charge the house batteries and the switch makes sure you aren’t
          shorting the circuit by inverting and converting simultaneously To
          understand the electrical system in different states, I created copies
          of the diagrams and then highlighted the power flow. When just the
          chassis engine is running: Notice it charges the house batteries and
          the car batteries if the xantrex unit is on. You really shouldn’t be
          using the coach AC outlets or pumps while you’re driving for safety
          reasons and it’s sorta silly.
        </p>
        <p>
          When connected to shore power: The systems when connected to shore or
          the generator you can think of as being the same. Only with the
          generator, you worry about the diesel gas that is left in the chassis
          tank. And with shore you worry that 30 Amp is being supplied. Our
          charging/inverting unit is fancy in it charges the batteries in stages
          to optimize battery and has a bunch of logic in it to protect and
          supply power appropriately. Last, I wanted to explore where all these
          components were actually located in the vehicle. Plus I wanted to
          explore the PDF capabilities of my new remarkable toy :)
        </p>
        <img
          src='/__next/pictures/01_28_2021/Shore_ON.png'
          className='img-fluid'
          alt='drawing of shore power ON'
        />
        <img
          src='/__next/pictures/01_28_2021/Engine_ON.png'
          className='img-fluid'
          alt='drawing of alternator power ON'
        />
        <p>
          Main take aways:
          <ul>
            <li>
              Read some newb guides and youtube videos, but don’t attempt to
              mastermind your RV Day -5. It’s all about learning as you go.
              PIctures are fun to draw and do help conceptualize though. When
              are you connecting to proper shore power or generator you are
              golden, but be careful when running high power consumers - AC,
              microwave, hair dryer, heater - simultaneously run the microwave
              and the AC at the same time. Starting the chassis engine or
              relying on the inverter be even more careful because the 120 AC
              system is being fed by the inverter and maybe the alternator Every
              RV is different and the only true source of truth is the physical
              connections.
            </li>
            <li>
              Don’t rely on your manuals as the holy grail because they all
              leave out some information and sometimes even lie to you! I think
              there is a reason so many retired folks choose the RVing as their
              sport of choice. With an RV every day presents unique challenges
              that you learn from. It is a great path for those of us that are
              innate learners and look forward to continual improvement.
            </li>
          </ul>
          Traveling and being with nature are just perks. The sport isn’t
          designed with a set of strict rules and guidelines. It’s about you
          figuring it out Being in my 20’s I decided to learn about RVing before
          I had owned a normal home for a year or been on a bar crawl. I will
          save the bar crawls and sky diving for my 70’s I guess!
        </p>
      </p>
    </BlogPost>
  );
}
