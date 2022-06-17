<template>
  <div style="display: flex; flex-direction: column; justify-content: space-between;  text-align: center; height: 90vh">
    <div>
      <h2>{{ question.question }}</h2>
      <p v-if="failed" style="color: red">Zła odpowiedź</p>
    </div>

    <div>
      <div
          style="display: flex; flex-direction: column; max-width: 500px; margin: auto; padding: 5px">
        <div style="padding-top:10px; cursor: pointer; background: beige; margin: 5px;"
             v-for="item in question.answers" @click="checkValue(item)">
          {{ item.answer }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import allQuestions from '../questions'
import {ref} from "@vue/reactivity";

const route = useRoute()
const slug = route.params.slug as string
if (!slug) {
  throw 404
}
if (!allQuestions[slug]) {
  throw 404
}
const items = allQuestions[slug]
const question = ref<Question>()
const failed = ref(false);

function nextQuestion() {
  question.value = items[Math.floor(Math.random() * items.length)];
}

function checkValue(answer: Answer) {
  if (answer.valid) {
    failed.value = false;
    nextQuestion();
  } else {
    failed.value = true;
  }
}

nextQuestion();
</script>
