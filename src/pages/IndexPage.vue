<template>
  <div>
    <q-carousel
      v-model="slide"
      transition-prev="slide-right"
      transition-next="slide-left"
      animated
      control-color="primary"
      navigation
      padding
      arrows
      height="300px"
      class="bg-grey-2 rounded-borders"
    >
      <q-carousel-slide :name="1" img-src="https://placeimg.com/500/300/nature">
        <div class="absolute-bottom custom-caption">
          <div class="text-h2">Slide 1</div>
          <div class="text-subtitle1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide
        :name="2"
        img-src="https://placeimg.com/500/300/nature/grayscale"
      >
        <div class="absolute-bottom custom-caption">
          <div class="text-h2">Slide 2</div>
          <div class="text-subtitle1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide :name="3" img-src="https://placeimg.com/500/300/arch">
        <div class="absolute-bottom custom-caption">
          <div class="text-h2">Slide 3</div>
          <div class="text-subtitle1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </div>
        </div>
      </q-carousel-slide>
    </q-carousel>

    <div class="q-pa-md">
      <FeaturedProducts />
    </div>
  </div>
</template>

<script>
import FeaturedProducts from "src/components/FeaturedProducts.vue";
import { ref } from "vue";

export default {
  components: {
    FeaturedProducts,
  },
  setup() {
    const slide = ref(1);

    return {
      slide,
    };
  },
};
</script>

<style>
.custom-caption {
  text-align: center;
  padding: 12px;
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
