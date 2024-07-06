import css from "./Hero.module.css";

export default function Hero() {
  return (
    <>
      <h1 className={css.title}>
        Hello, <span className={css.titleName}>my name is Andrew</span>, and
        I&apos;m a frontend developer
      </h1>
    </>
  );
}
