<template>
  <div style="display: flex; flex-direction: column; justify-content: space-between;  text-align: center; height: 98vh">
    <div>
      <div style="display: flex; flex-direction: row; justify-content: space-between;">
        <small>Pozostało: {{items?.length+1}}</small>
        <small style="color: green;">Poprawnie: {{types}}</small>
        <small style="color:red;">Błędy: {{ miss }}</small>
        <small>Pominięcia: {{ skip }}</small>
      </div>
      <h2>{{ question.question }}</h2>
      <p v-if="failed" style="color: red">Zła odpowiedź</p>
    </div>

    <div style="margin-left: auto;margin-right: auto;">
      <div @click="skipNext()" style="padding-top:10px; cursor: pointer; background: beige; margin: 5px; max-width: 500px; ">Pomiń</div>
      <div
          style="display: flex; flex-direction: column; max-width: 500px; padding: 5px; margin-top: 15px;">
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
import {getInz} from "~/questions/inzynier";

const route = useRoute()
const slug = route.params.slug as string
if (!slug) {
  throw 404
}
if (!allQuestions[slug]) {
  throw 404
}
const items = ref(getInz())
const question = ref<Question>()
const failed = ref(false);

const skip = ref(0);
const miss = ref(0);
const types = ref(0);

function nextQuestion() {
  question.value = items.value[Math.floor(Math.random() * items.value.length)];
}

function checkValue(answer: Answer) {
  if (answer.valid) {
    types.value = types.value + 1;
    failed.value = false;
    removeQuestion();
    nextQuestion();
  } else {
    miss.value = miss.value + 1;
    failed.value = true;
  }
}
function removeQuestion(){
  if(question.value)
 items.value = items.value.filter(i => i.question !== question.value.question);
}

function skipNext(){
  skip.value = skip.value + 1;
  nextQuestion();
}

nextQuestion();
</script>
