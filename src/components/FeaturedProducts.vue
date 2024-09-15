<template>
  <div>
    <h2>Sản phẩm nổi bật</h2>

    <div v-if="loading">
      <q-spinner-dots color="primary" size="3em" />
    </div>
    <div v-else-if="error">
      <div class="text-negative">Lỗi: {{ error }}</div>
      <q-btn color="primary" label="Thử lại" @click="fetchProducts" />
    </div>
    <div v-else-if="featuredProducts.length === 0">
      Không có sản phẩm nổi bật nào.
    </div>
    <div v-else class="row q-col-gutter-md">
      <div
        v-for="product in featuredProducts"
        :key="product.id"
        class="col-xs-6 col-md-3"
      >
        <q-card>
          <q-img :src="product.image.sourceUrl" :alt="product.image.altText" />
          <q-card-section>
            <div class="text-h6">{{ product.name }}</div>
            <div class="text-subtitle2">{{ product.price }} VND</div>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn
              flat
              color="primary"
              label="Xem chi tiết"
              @click="showProductDetail(product.id)"
            />
            <q-btn
              color="secondary"
              label="Thêm vào giỏ hàng"
              @click="addToCart(product)"
            />
          </q-card-actions>
        </q-card>
      </div>
    </div>

    <q-dialog v-model="showProductDetailModal">
      <ProductDetail :productId="selectedProductId" />
    </q-dialog>
  </div>
</template>

<script setup>
// import { mapActions } from 'vuex';
import { ref, computed, onMounted } from "vue";
import { api } from "boot/axios"; // Import the Axios instance
import ProductDetail from "./ProductDetail.vue";

const featuredProducts = ref([]);
const loading = ref(true);
const error = ref(null);

const showProductDetailModal = ref(false);
const selectedProductId = ref(null);

const showProductDetail = (productId) => {
  selectedProductId.value = productId;
  showProductDetailModal.value = true;
};

// const { addToCart } = mapActions('cart', ['addToCart']);

const fetchProducts = () => {
  loading.value = true;
  error.value = null;

  api
    .post("", {
      // Use the api instance for the request
      query: `
      query getProducts {
        products(first: 3) {
          nodes {
            id
            name
            image {
              sourceUrl
              altText
            }
            ... on SimpleProduct {
              price
            }
          }
        }
      }
    `,
    })
    .then((response) => {
      featuredProducts.value = response.data.data.products.nodes;
    })
    .catch((err) => {
      error.value = err;
    })
    .finally(() => {
      loading.value = false;
    });
};

onMounted(fetchProducts);
</script>
