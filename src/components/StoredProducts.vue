<template>
  <div class="flex items-center justify-center">
    <button
      @click="loadProducts"
      class="mt-6 block select-none rounded-lg bg-gray-900 hover:bg-cyan-700 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
    >
      Refresh Products
    </button>
  </div>
  <div v-if="results != ''" class="flex flex-wrap justify-center gap-6 mt-10">
    <product-item
      v-for="res in results"
      :key="res._id"
      :id="res._id"
      :name="res.name"
      :price="res.price"
      :url="res.imageUrl"
      :qty="res.qty"
      :totalPrice="res.totalPrice"
    ></product-item>
  </div>
  <div class="flex items-center justify-center" v-else>
    <img
      src="https://static.vecteezy.com/system/resources/thumbnails/005/006/007/small/no-item-in-the-shopping-cart-click-to-go-shopping-now-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-vector.jpg"
      alt=""
    />
  </div>
</template>

<script>
import axios from 'axios';
import ProductItem from "../components/ProductItem.vue";

export default {
  components: {
    ProductItem,
  },
  data() {
    return {
      results: [],
    };
  },
  async created() {
    const response = await axios.get("/api/product");
    const products = response.data;
    this.results = products;
  },
};
</script>