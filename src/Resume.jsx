import { useEffect, useState } from "react";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import yaml from "js-yaml";
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
    margin-top: 2.6cm;
  }

  > .username {
    text-transform: capitalize;
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
    margin-top: 1.6em;
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
    font-size: 0.9em;
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
  margin-right: 2em;
  position: relative;
  > label {
    position: relative;
    z-index: 1;
    font-size: ${(props) => (props.dense ? "0.9" : "1")}em;
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
    filter: grayscale(1);
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
function UnstyledExperience({ className, position, company, period, children }) {
  return (
    <li className={className}>
      <h3 className="position">{position}</h3>
      <div className="meta">
        <span>{company}</span> | <span>{period}</span>
      </div>
      {children}
    </li>
  );
}
const Experience = styled(UnstyledExperience)`
  > .position {
    font-size: 1.5em;
    font-weight: bold;
    margin-bottom: 0;
    margin-top: 1em;
  }
  > .meta {
    font-size: 1.2em;
  }
  p {
    margin: 0;
  }
  li {
    list-style-type: disc;
  }
`;
function UnstyledReference({ className, company, position, mobile, children }) {
  return (
    <li className={className}>
      <label className="name">{children}</label>
      <div className="corp-pos">
        <span className="company">{company}</span> | <span className="position">{position}</span>
      </div>
      <div className="contact">
        <FaMobileAlt className="icon" />
        <span className="text">{mobile}</span>
      </div>
    </li>
  );
}
const Reference = styled(UnstyledReference)`
  display: block;

  > .name {
    display: block;
    font-weight: bold;
  }

  > .corp-pos,
  > .contact {
    display: block;
  }

  .icon,
  .text {
    display: inline-block;
    vertical-align: middle;
  }
  .icon {
    margin-right: 0.5em;
  }
`;
function Resume({ lang = "" }) {
  const [resume, setResurme] = useState();
  const filename = lang && lang !== "en" ? `Resume-${lang}.yaml` : "Resume.yaml";
  useEffect(() => {
    fetch(filename)
      .then((resp) => {
        if (!resp.ok) {
          throw new Error("Unable to load: " + filename);
        }
        return resp.text();
      })
      .then((text) => {
        const r = yaml.load(text);
        console.log(r);
        return r;
      })
      .then(setResurme)
      .catch((err) => {
        err && console.error(err);
      });
  }, [filename]);
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
  if (!resume) {
    return null;
  }
  const {
    fullname,
    role,
    location,
    avatar,
    email,
    mobile,
    homepage,
    skills,
    awards,
    education,
    professionals,
    profile,
    experiences,
    references,
  } = resume;
  const exp0 = experiences[0] || {};
  const exps = experiences.slice(1);
  return (
    <>
      <Page>
        <Aside>
          <BookMarker>{location}</BookMarker>
          <Header role={role}>{fullname}</Header>
          <Section aside title="SKILLS">
            <AsideList dense>
              {skills.map(({ label, proficiency, dense },i) => (
                <Skill key={i} proficiency={proficiency} dense={dense}>
                  {label}
                </Skill>
              ))}
            </AsideList>
          </Section>
          <Section aside title="AWARD">
            <AsideList>
              {awards.map(({ title, period },i) => (
                <Award key={i} period={period}>{title}</Award>
              ))}
            </AsideList>
          </Section>
          <Section aside title="EDUCATION">
            <AsideList>
              <Education period={education.period} major={education.major}>
                {education.university}
              </Education>
            </AsideList>
          </Section>
        </Aside>
        <Main toBeContined="... to be continued">
          <VCard fullname={fullname} avatar={avatar} email={email} mobile={mobile} homepage={homepage} />
          <Section title="PROFILE">
            <ReactMarkdown>{profile}</ReactMarkdown>
          </Section>
          <Section title="EXPERIENCE">
            <Experiences>
              <Experience position={exp0.position} company={exp0.company} period={exp0.period}>
                <p>{exp0.summary}</p>
                <ul>
                  {exp0.bullets.map((bullet,i) => (
                    <li key={i}>{bullet}</li>
                  ))}
                </ul>
              </Experience>
            </Experiences>
          </Section>
        </Main>
      </Page>
      <Page>
        <Aside>
          <Header role="Full-stack Developer">{fullname}</Header>
          <Section aside title="PROFESSIONAL">
            <AsideList dense>
              {professionals.map(({ label, proficiency },i) => (
                <Skill key={i} proficiency={proficiency}>{label}</Skill>
              ))}
            </AsideList>
          </Section>
          <Section aside title="REFERENCES">
            <AsideList>
              {references.map(({ name, position, company, mobile }) => (
                <Reference key={name} position={position} company={company} mobile={mobile}>
                  {name}
                </Reference>
              ))}
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
        <Main continuing="Continued -">
          <Section title="EXPERIENCE">
            <Experiences>
              {exps.map(({ position, company, period, summary, bullets },i) => (
                <Experience key={i} position={position} company={company} period={period}>
                  <p>{summary}</p>
                  <ul>
                    {bullets.map((bullet,i) => (
                      <li key={i}>{bullet}</li>
                    ))}
                  </ul>
                </Experience>
              ))}
            </Experiences>
          </Section>
        </Main>
      </Page>
    </>
  );
}

export default Resume;
