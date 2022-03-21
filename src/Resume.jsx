import { useEffect } from "react";
import styled from "styled-components";
import { IoLocationSharp } from "react-icons/io5";
import { IconContext } from "react-icons";
import { SiItunes } from "react-icons/si";
import { SiCounterstrike } from "react-icons/si";
import { AiOutlineTaobao } from "react-icons/ai";
import { FaSteam } from "react-icons/fa";
import { FaBookReader } from "react-icons/fa";
import { FaMobileAlt } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { GiTeapotLeaves } from "react-icons/gi";
import { GiJumpingRope } from "react-icons/gi";
import { GiKite } from "react-icons/gi";
import { GiShuttlecock } from "react-icons/gi";
import { MdEmail } from "react-icons/md";
import "./Resume.css";

const Page = styled.div`
  height: 297mm;
  overflow: hidden;
  background-color: var(--resume-bg-color);
  color: var(--resume-color);
  margin: 2em 0;
  box-sizing: border-box;

  @media print {
    break-after: page;
    margin: 0;
  }

  &::after {
    display: block;
    clear: both;
    content: "";
  }
`;
const Aside = styled.aside`
  float: left;
  width: 34%;
  height: 100%;
  background-color: var(--resume-secondary-bg-color);
  padding-left: var(--resume-margin-x);
`;

function UnstyledMain({ className, children, toBeContined, continuing }) {
  return (
    <main className={className}>
      {continuing && <em className="continuing">{continuing}</em>}
      {children}
      {toBeContined && <em className="to-be-continued">{toBeContined}</em>}
    </main>
  );
}
const Main = styled(UnstyledMain)`
  margin-left: 34%;
  height: 100%;
  position: relative;
  padding-right: var(--resume-margin-x);

  > .continuing {
    display: flex;
    height: 53mm;
    padding-left: var(--resume-margin-x);
    align-items: flex-end;
  }
  > .to-be-continued {
    display: block;
    text-align: center;
    margin-top: 1em;
    border-top: 1px dotted var(--resume-secondary-color);
    margin-left: var(--resume-margin-x);
    color: var(--resume-secondary-color);
  }
`;
function UnstyledBookMarker({ className, children }) {
  return (
    <div className={className}>
      <div className="marker">
        <IoLocationSharp className="nail" />
      </div>
      <label className="address">{children}</label>
    </div>
  );
}
const BookMarker = styled(UnstyledBookMarker)`
  width: 100%;
  height: 27mm;
  position: relative;

  > .marker {
    background-color: var(--resume-color);
    position: absolute;
    width: 1em;
    height: 100%;
    top: 0;
    left: 0;
    white-space: normal;
  }

  > .marker > .nail {
    position: absolute;
    bottom: 0.9em;
    color: white;
  }

  > .address {
    position: absolute;
    bottom: 1em;
    left: 0;
    right: 0;
    height: 1em;
    padding-left: 1.5em;
  }
`;
function UnstyledHeader({ role, className, children }) {
  return (
    <header className={className}>
      <h1 className="username">{children}</h1>
      <small className="role">{role}</small>
    </header>
  );
}
const Header = styled(UnstyledHeader)`
  display: block;
  margin-top: 2.8em;

  &:first-child {
    margin-top: 2cm;
  }

  > .username {
    font-size: 4em;
    font-weight: bold;
    margin: 0;
  }

  > .role {
    font-size: 1.2em;
  }
  > .role::before {
    content: "";
    display: inline-block;
    width: 1em;
    height: 0.6em;
    background-color: var(--resume-color);
    margin-right: 0.5em;
  }
`;
function UnstyledSection({ title, className, children }) {
  return (
    <section className={className}>
      <h2 className="title">{title}</h2>
      <hr />
      {children}
    </section>
  );
}
const Section = styled(UnstyledSection)`
  padding-left: ${(props) => (props.aside ? 0 : "var(--resume-margin-x)")};

  > .title {
    font-size: 1.5em;
    font-weight: bold;
    margin: 0;
    margin-top: 2em;
  }

  > .title + hr {
    margin: 0.8em 0;
    position: relative;
    left: ${(props) => (props.aside ? 0 : "calc(var(--resume-margin-x) * -1)")};
    width: ${(props) => (props.aside ? "4em" : "50%")};
  }
`;
function UnstyledList({ className, children }) {
  return <ul className={className}>{children}</ul>;
}
const AsideList = styled(UnstyledList)`
  margin: 0;
  padding: 0;

  > li {
    display: block;
  }
  > li ~ li {
    margin-top: ${(props) => (props.dense ? "0.6" : "0.8")}em;
  }
`;
function UnstyledInterests({ className, children }) {
  return <ul className={className}>{children}</ul>;
}
const Interests = styled(UnstyledInterests)`
  margin: 1em 0 0;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-row-gap: 1em;

  aside & {
    margin-right: var(--resume-margin-x);
  }
  > li {
    display: block;
  }
`;
function Interest({ className, Icon, title }) {
  return (
    <li className={className}>
      <Icon title={title} />
    </li>
  );
}
function UnstyledEducation({ period, major, className, children }) {
  return (
    <li className={className}>
      {major && <div className="major">{major}</div>}
      <div className="college">{children}</div>
      <small className="period">{period}</small>
    </li>
  );
}
const Education = styled(UnstyledEducation)`
  display: block;

  > .major {
    display: block;
    font-weight: bold;
  }

  > .college {
    display: block;
  }

  > .period {
    display: block;
    color: var(--resume-secondary-color);
  }

  & ~ & {
    margin-top: 3em;
  }
`;
function UnstyledSkill({ className, proficiency, children }) {
  return (
    <li className={className}>
      <label>{children}</label>
      <ProcessBar rate={proficiency} />
    </li>
  );
}
const Skill = styled(UnstyledSkill)`
  margin-right: 1em;
  position: relative;
  > label {
    position: relative;
    z-index: 1;
  }
`;
function UnstyledProcessBar({ className, rate }) {
  return (
    <div className={className} role="progressbar" aria-valuenow={rate} aria-valuemin="0" aria-valuemax="100">
      <div className="complated"></div>
    </div>
  );
}
const ProcessBar = styled(UnstyledProcessBar)`
  display: block;
  position: absolute;
  background-color: var(--resume-color);
  width: 4em;
  right: 0;
  top: 25%;
  bottom: 25%;

  > .complated {
    display: block;
    background-color: var(--resume-bg-color);
    position: absolute;
    left: 0;
    top: 25%;
    bottom: 25%;
    width: ${(props) => props.rate || 0}%;
  }
`;
function UnstyledAward({ className, period, children }) {
  return (
    <li className={className}>
      <div className="name">{children}</div>
      <div className="period">{period}</div>
    </li>
  );
}
const Award = styled(UnstyledAward)`
  > .name {
    display: block;
    font-weight: bold;
  }
  > .period {
    display: block;
    color: var(--resume-secondary-color);
  }
`;
function UnstyledVCard({ className, fullname, avatar, homepage, email, mobile }) {
  return (
    <address className={`${className} vcard`}>
      <span className="fn">${fullname}</span>
      <img className="photo" src={avatar} alt={fullname} />
      <a className="email" href={`mailto:${email}`}>
        <MdEmail className="icon" />
        <span className="text">{email}</span>
      </a>
      <a className="url" href={homepage}>
        <FaHome className="icon" />
        <span className="text">{homepage}</span>
      </a>
      <div className="tel">
        <FaMobileAlt className="icon" />
        <span className="text">{mobile}</span>
      </div>
    </address>
  );
}
const VCard = styled(UnstyledVCard)`
  display: block;
  font-style: normal;
  height: 53mm;

  > .fn {
    display: none;
  }
  > .photo {
    width: 35mm;
    height: 53mm;
    float: left;
    margin-right: 3em;
  }
  > .email {
    padding-top: 3cm;
  }
  > .email,
  > .url,
  > .tel {
    display: block;
    line-height: 2em;
  }
  .icon,
  .text {
    display: inline-block;
    vertical-align: middle;
  }
  .icon {
    margin-right: 1em;
  }
`;

function UnstyledExperiences({ className, children }) {
  return <ul className={className}>{children}</ul>;
}
const Experiences = styled(UnstyledExperiences)`
  margin: 0;
  padding: 0;

  & ~ & {
    margin-top: 2em;
  }

  > li {
    display: block;
  }
`;
const Experience = styled.li``;
function Resume() {
  useEffect(() => {
    function preventDefault(e) {
      e.preventDefault();
    }
    const originTitle = document.title;
    document.title = "Resume";
    document.addEventListener("click", preventDefault);
    return () => {
      document.removeEventListener("click", preventDefault);
      document.title = originTitle;
    };
  }, []);
  return (
    <>
      <Page>
        <Aside>
          <BookMarker>Hefei, Anhui, China</BookMarker>
          <Header role="Full-stack Developer">PEI LI</Header>
          <Section aside title="SKILLS">
            <AsideList>
              <Skill proficiency="60">English</Skill>
              <Skill proficiency="60">Project Planning</Skill>
              <Skill proficiency="50">Leadership</Skill>
              <Skill proficiency="75">Software Architecture</Skill>
              <Skill proficiency="85">Software Design</Skill>
              <Skill proficiency="60">API Design</Skill>
              <Skill proficiency="90">Study & Research</Skill>
            </AsideList>
          </Section>
          <Section aside title="AWARD">
            <AsideList>
              <Award period="2020 ~ 2023">Project Management Professional</Award>
            </AsideList>
          </Section>
          <Section aside title="EDUCATION">
            <AsideList>
              <Education period="2005 - 2010" major="Electronic Information Engineering">
                Ahhui Agricultural University
              </Education>
            </AsideList>
          </Section>
        </Aside>
        <Main toBeContined="... continue on the back">
          <VCard
            fullname="Pei Li"
            avatar="./avatar-template.jpg"
            email="jterraghost@gmail.com"
            mobile="+86 189 1960 1457"
            homepage="https://terrason.github.io"
          />
          <Section title="PROFILE">
            <p>
              <strong>
                I am a creative Fullstack Developer, with +12 years experience in developing application from scratch to
                complex financial system.
              </strong>{" "}
              I have a strong foundation in Java, HTML/CSS and JavaScript. I enjoy solving real-life problems with
              clean, scalable and efficient solutions.
            </p>
            <p>
              <strong>I am passionate about saving development costs by graceful software design.</strong> I have
              introduced a communication driven modeling in my software design, which is very inspired by
              DDD. Doing the right way, reducing code complexity, saving development cost.
            </p>
            <p>
              I am a voracious reader and that hobby has honed my ability to learn new concepts quickly and ask
              insightful and meaningful questions. After participating or leading in all phases of the software
              development lifecycle for many years, I am seeking a growth opportunity within a meritocratic company,
              <strong>looking forward to mentoring to transition to a real software architect.</strong>
            </p>
          </Section>
          <Section title="EXPERIENCE">
            <Experiences>
              <Experience>asfefef</Experience>
              <Experience>asfefef</Experience>
              <Experience>asfefef</Experience>
              <Experience>asfefef</Experience>
            </Experiences>
          </Section>
        </Main>
      </Page>
      <Page>
        <Aside>
          <Header role="Full-stack Developer">PEI LI</Header>
          <Section aside title="TECHNICAL">
            <AsideList dense>
              <Skill proficiency="80">Git/SVN</Skill>
              <Skill proficiency="80">HTML/CSS</Skill>
              <Skill proficiency="90">Javascript</Skill>
              <Skill proficiency="75">React</Skill>
              <Skill proficiency="60">Bash</Skill>
              <Skill proficiency="60">Nodejs</Skill>
              <Skill proficiency="40">Python</Skill>
              <Skill proficiency="90">Java</Skill>
              <Skill proficiency="90">Spring Framework</Skill>
              <Skill proficiency="90">Spring Boot</Skill>
              <Skill proficiency="75">Spring Cloud</Skill>
              <Skill proficiency="80">Spring Data JPA</Skill>
              <Skill proficiency="90">Mybatis</Skill>
              <Skill proficiency="75">DDD</Skill>
              <Skill proficiency="75">Linux</Skill>
              <Skill proficiency="75">MySQL</Skill>
              <Skill proficiency="65">Ehcache/Redis</Skill>
              <Skill proficiency="60">Kafka/RabbitMQ</Skill>
              <Skill proficiency="50">Jenkins+K8s+Rancher</Skill>
              <Skill proficiency="90">OmniPlan</Skill>
            </AsideList>
          </Section>
          <Section aside title="INTERESTS">
            <IconContext.Provider value={{ size: "2em" }}>
              <Interests>
                <Interest Icon={FaSteam} title="steam games" />
                <Interest Icon={SiCounterstrike} title="old games" />
                <Interest Icon={GiShuttlecock} title="shuttlecock" />
                <Interest Icon={GiJumpingRope} title="jump rope" />
                <Interest Icon={GiKite} title="kite" />
                <Interest Icon={FaBookReader} title="read" />
                <Interest Icon={GiTeapotLeaves} title="tea" />
                <Interest Icon={AiOutlineTaobao} title="shopping" />
                <Interest Icon={SiItunes} title="listen music" />
              </Interests>
            </IconContext.Provider>
          </Section>
        </Aside>
        <Main continuing="Continued -">sdfefsdfaef</Main>
      </Page>
    </>
  );
}

export default Resume;
