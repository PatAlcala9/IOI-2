<template>
  <q-page padding class="page">
    <div class="workArea">
      <div class="main">
        <img class="logo" ref="logox" src="../../assets/logo.png" alt="OCBO Logo" />
        <br />
        <div v-if="pc">
          <h2 class="title">Online Inspection</h2>
        </div>
        <div v-else>
          <!-- <h2 class="title3">IIPS</h2> -->
          <h2 class="title">Online Inspection</h2>
        </div>
        <h2 class="title title2">Documentation</h2>

        <q-btn color="primary" size="lg" class="start" @click="nextPage">Get Started</q-btn>
        <q-btn flat rounded color="white" size="lg" class="back" @click="backPage">Go Back</q-btn>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

let pc = ref(true)

const checkUnit = async () => {
  const android = navigator.userAgent.match(/Android/i)
  if (android !== null) {
    pc.value = false
  }
  const ios = navigator.userAgent.match(/iPhone/i)
  if (ios !== null) {
    pc.value = false
  }
}

const nextPage = () => {
  router.push('/doctwo')
}

const backPage = () => {
  router.push('/')
}

;(async () => {
  await checkUnit()
})()
</script>

<style lang="sass" scoped>
.workArea
  display: grid
  grid-template-columns: 1fr
  grid-template-areas: 'main'

.workArea-dark
  align-items: center
  align-content: center
  width: 100%
  height: 65vw
  min-width: 100%
  min-height: 100%

.main
  grid-area: main
  display: flex
  flex-direction: column
  flex-wrap: wrap
  justify-content: flex-start
  align-items: center
  align-content: center

.title
  color: #ffbe00
  text-transform: uppercase
  font-weight: bold

.title2
  margin-top: -0.8em

.title3
  color: #ffbe00
  text-transform: uppercase
  font-weight: bold
  margin-top: -0.2em
  width: 100%
  text-align: center

.logo
  margin-top: 5px
  width: 250px
  height: 250px

.start
  margin-top: 5em

.back
  margin-top: 1em

@media screen and (min-width: 0px)
  .logo
    width: 150px
    height: 150px

  .title
    font-size: 1.8rem
  .title2
    margin-top: -1.8em

@media screen and (min-width: 900px)
  .logo
    width: 200px
    height: 200px

  .title
    font-size: 3rem

  .title2
    margin-top: -1em

  @media screen and (min-width: 1280px)
    .logo
      width: 250px
      height: 250px

    .title
      font-size: 3.5rem

    .title2
      margin-top: -0.8em
</style>
