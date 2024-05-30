<template>
  <div class="flex items-center gap-5 p-6 border-gray-200 rounded-lg shadow">
    <button
      class="mt-6 block w-full select-none rounded-lg bg-gray-900 hover:bg-cyan-700 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      @click="setSelectedTab('stored-products')"
    >
      Stored Products
    </button>
    <button
      class="mt-6 block w-full select-none rounded-lg bg-gray-900 hover:bg-cyan-700 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      @click="setSelectedTab('add-products')"
    >
      Add Products
    </button>
  </div>
  <component :is="selectedTab"></component>
</template>

<script>
import addProducts from "./addProducts.vue";
import StoredProducts from "./StoredProducts.vue";

export default {
  components: {
    StoredProducts,
    addProducts,
  },
  data() {
    return {
      selectedTab: "stored-products",
    };
  },
  provide() {
    return {
      addProducts: this.addProduct,
    };
  },
  methods: {
    setSelectedTab(tab) {
      this.selectedTab = tab;
    },
    addProduct(enteredName, enteredPrice, enteredUrl, qty, enteredTotalPrice) {
      fetch("/api/adminProducts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: enteredName,
          price: enteredPrice,
          url: enteredUrl,
          qty: qty,
          totalPrice: enteredTotalPrice
        }),
      });
      alert('Successfully added Product To the admin');
      this.selectedTab = "stored-products";
    },
  },
};
</script>