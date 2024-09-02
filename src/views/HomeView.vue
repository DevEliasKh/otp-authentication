<script setup>
import { onMounted, ref } from 'vue'
import convertToPersianNumber from '@/utils/convertToPersian'
import { useTimerStore } from '@/stores/timer-store'
import BaseOTP from '@/components/BaseOTP.vue'

const timerStore = useTimerStore()
const btn = ref(null)
const timerBox = ref(null)
const key = ref('')
const isLoading = ref(false)
const showTime = ref('۰۰:۰۰')
const timerValue = 10
const timer = ref('')

const numberOfOTCBoxes = 6

let timerInterval

const numberInHint = convertToPersianNumber(numberOfOTCBoxes)

onMounted(() => {
  if (timerStore.$state.timer == 0) {
    timer.value = timerValue
    timerStore.setTimer(timerValue)
  } else {
    timer.value = timerStore.$state.timer
  }
  startInterval()
})

function countDown() {
  const min = Math.floor(timer.value / 60)
  const sec = timer.value - min * 60

  timer.value = timer.value - 1
  timerStore.setTimer(timer.value)

  showTime.value = `${sec}: ${min}`
  if (timer.value < -1) {
    endInterval()
    resetTimer()
    timerBox.value.style.opacity = 0
    resetBtn(false)
  }
}

function MoveToNext(e) {
  if (e.target.tabIndex == numberOfOTCBoxes) {
    btn.value.disabled = false
    btn.value.textContent = 'ارسال'
    btn.value.focus()
  } else {
    if (e.target.value.length == 1) {
      e.target.nextSibling.focus()
      key.value = `${key.value + e.target.value}`
    }
    if (e.target.value.length == 0) {
      const keyArr = key.value.split('')
      keyArr.pop()
      key.value = keyArr.join('')
      e.target.previousSibling?.focus()
    }
  }
}

function showLoading() {
  isLoading.value = true
  setTimeout(() => {
    if (timer.value < 0) {
      resetBtn(true)
    } else {
      resetBtn(true)
    }
    timerBox.value.style.opacity = 1
    isLoading.value = false
  }, 3000)
}
function startInterval() {
  timerInterval = setInterval(countDown, 1000)
}
function endInterval() {
  clearInterval(timerInterval)
  resetTimer()
}

function resetTimer() {
  timerStore.setTimer(timerValue)
  timer.value = timerValue
}

function resetBtn(disable) {
  btn.value.disabled = disable
  btn.value.textContent = 'ارسال مجدد'
}

function submitHandler(event) {
  event.preventDefault()

  endInterval()
  showLoading()
  setTimeout(() => {
    startInterval()
  }, 3000)
}
</script>

<template>
  <main>
    <div class="loading" v-if="isLoading">
      <div class="lds-dual-ring"></div>
    </div>
    <form class="card" @submit="submitHandler">
      <div class="text">
        کد تایید برای شماره تلفن ۰۹۳۹۱۰۶۶۱۳۴ ارسال شد.
      </div>
      <BaseOTP
        :onFilledInput="MoveToNext"
        :numberOfOTCBoxes="numberOfOTCBoxes"
      >
        <template #hint>
          <div class="otp__text">
            کد ارسال {{ numberInHint }} رقمی را اینجا وارد کنید
          </div>
        </template>
      </BaseOTP>
      <div class="footer">
        <div class="footer__timer" ref="timerBox">
          زمان باقی مانده
          <span class="footer__time">
            {{ showTime }}
          </span>
        </div>
        <button ref="btn" disabled="true" class="button">
          ارسال مجدد
        </button>
      </div>
    </form>
  </main>
</template>
<style lang="scss">
main {
  background: url('src/assets/images/BG Image.png');
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.card {
  background-color: white;
  height: 52.5rem;
  width: 37.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
}

.text {
  color: var(--Text-Title, #3c4351);
  text-align: center;

  /* Regular 16 */
  font-family: Peyda;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.otp {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  &__boxes {
    display: flex;
    flex-direction: row-reverse;
    gap: 0.75rem;
  }
  &__box {
    border: solid 1px black;
    text-align: center;
    width: 3.0625rem;
    height: 3rem;
    background-color: var(--Surface-Lightblue, #f9fafb);
    border-radius: 20px;
    border: none;
    &:focus,
    &:focus-visible {
      border-radius: 0.375rem;
      border: 1px solid #00aace;
      background: var(--Surface-Lightblue, #f9fafb);
      outline: none;
    }
  }
  &__text {
    color: var(--Text-Gray, #8999b9);
    text-align: right;

    /* Regular 12 */
    font-family: Peyda;
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
}

.footer {
  display: flex;
  flex-direction: column;

  gap: 0.5rem;
  &__timer {
    color: var(--Primary-Primary-500, #4152a0);
    text-align: center;

    /* Bold 14 */
    font-family: Peyda;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 700;
    line-height: 1.75rem; /* 200% */
  }
}

.button {
  border: none;
  border-radius: 0.5rem;
  background: var(--Primary-Primary-500, #4152a0);
  border: none;
  outline: none;

  display: flex;
  width: 22.125rem;
  height: 3rem;
  padding: 0.5rem 1rem;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;

  color: var(--Text-On-Primary, #fff);
  text-align: center;

  /* Bold 16 */
  font-family: Peyda;
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.75rem; /* 175% */

  transition: all 300ms;

  &:disabled {
    opacity: 0.2;
    color: var(--Text-On-Primary, #fff);
  }
  &:focus {
    border: 1px white solid;
  }
  &:hover {
    transform: scale(1.05);
  }
  &:focus-visible,
  &:fucus {
    transform: scale(1.05);
    border: none;
    outline: none;
  }
}

.loading {
  width: 100vw;
  height: 100vh;
  position: absolute;
  z-index: 5;

  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba($color: #fff, $alpha: 0.5);

  .lds-dual-ring,
  .lds-dual-ring:after {
    box-sizing: border-box;
  }
  .lds-dual-ring {
    display: inline-block;
    width: 80px;
    height: 80px;
  }
  .lds-dual-ring:after {
    content: ' ';
    display: block;
    width: 64px;
    height: 64px;
    margin: 8px;
    border-radius: 50%;
    border: 6.4px solid #4152a0;
    border-color: currentColor transparent currentColor transparent;
    animation: lds-dual-ring 1.2s linear infinite;
  }
  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
