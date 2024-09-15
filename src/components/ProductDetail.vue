<template>
  <q-dialog v-model="showDialog" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Chi tiết sản phẩm</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div v-if="loading">Đang tải...</div>
        <div v-else-if="error">Lỗi: {{ error }}</div>
        <div v-else>
          <q-img
            :src="product.image.sourceUrl"
            :alt="product.image.altText"
            style="height: 200px"
          />
          <div class="q-pa-md">
            <div class="text-h5 q-mb-md">{{ product.name }}</div>
            <div v-html="product.description"></div>
            <div class="text-h6 q-mt-lg">{{ product.price }} VND</div>
            <div v-if="product.stockQuantity > 0" class="text-green">
              Còn hàng
            </div>
            <div v-else class="text-red">Hết hàng</div>

            <q-btn
              v-if="product.stockQuantity > 0"
              color="primary"
              label="Thêm vào giỏ hàng"
              @click="addToCart(product)"
              class="q-mt-lg"
            />
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Đóng" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { api } from "boot/axios";
// import { mapActions } from 'vuex';

const props = defineProps({
  productId: {
    type: String,
    required: true,
  },
  showDialog: {
    type: Boolean,
    default: false,
  },
});

const route = useRoute();
const productId = route.params.id;

const product = ref({});
const loading = ref(true);
const error = ref(null);

const showDialog = ref(props.showDialog);

// const { addToCart } = mapActions('cart', ['addToCart']);

const fetchProduct = () => {
  loading.value = true;
  error.value = null;

  api
    .post("", {
      query: `
      query getProduct($id: ID!) {
        product(id: $id) {
          id
          name
          description
          image {
            sourceUrl
            altText
          }
          ... on SimpleProduct {
            price
            stockQuantity
          }
        }
      }
      `,
      variables: { id: productId },
    })
    .then((response) => {
      product.value = response.data.data.product;
    })
    .catch((err) => {
      error.value = err;
    })
    .finally(() => {
      loading.value = false;
    });
};

onMounted(fetchProduct);
</script>
