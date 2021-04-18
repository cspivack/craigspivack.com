<template>
  <section id="intro">

    <div id="intro-inner">

      <h1>Hi, I'm <span><em>Craig</em></span></h1>

      <p>I live in Jersey City.</p>

      <p>I work in web development (Laravel, VueJS, other stuff).</p>

      <p>I care about accessibility and I'm always trying to improve it in my projects.</p>

      <p>I'm not the dog in the picture. His name is Kirby.</p>

    </div>

    <div class="bg">
      <img src="/bg.jpg" alt="Picture of a dog with its head resting on a keyboard">
    </div>
  </section>
</template>

<style lang="scss">

#intro {
  width: 100%;
  height: calc(100vh - 3rem);
  padding: 3em calc(50% + 1.5em) 3em 3em;
  position: relative;
  .bg {
    width: 50%;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: right top;
    }
    @include media($lg) {
      background-position: 25% top;
      img {
        object-position: 25% top;
      }
    }
    @include media($md) {
      background-position: 40% top;
      img {
        object-position: 40% top;
      }
    }
    @include media($xs) {
      background-position: center;
      img {
        object-position: center;
      }
    }
  }
  @include media($xs) {
    padding: 1em;
    #intro-inner {
      overflow: auto;
      height: 60%;
    }
    .bg {
      width: 100%;
      height: 40%;
      top: auto;
      bottom: 0;
    }
    h1 {
      font-size: 1.5em;
    }
    p {
      font-size: 0.9375em;
    }
  }
}
</style>
