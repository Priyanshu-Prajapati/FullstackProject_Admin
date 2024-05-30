<template>
  <div
    class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow"
  >
    <div class="flex justify-end px-2 top">
      <button
        @click="deleteProduct"
        id="dropdownButton"
        data-dropdown-toggle="dropdown"
        class="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg text-sm p-1.5"
        type="button"
      >
        <span class="sr-only">Open dropdown</span>
        <div>
          <svg
            class="w-5 top-0"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="100"
            height="50"
            viewBox="0 0 24 24"
          >
            <path
              d="M 10 2 L 9 3 L 3 3 L 3 5 L 4.109375 5 L 5.8925781 20.255859 L 5.8925781 20.263672 C 6.023602 21.250335 6.8803207 22 7.875 22 L 16.123047 22 C 17.117726 22 17.974445 21.250322 18.105469 20.263672 L 18.107422 20.255859 L 19.890625 5 L 21 5 L 21 3 L 15 3 L 14 2 L 10 2 z M 6.125 5 L 17.875 5 L 16.123047 20 L 7.875 20 L 6.125 5 z"
            ></path>
          </svg>
        </div>
      </button>
      <!-- Dropdown menu -->
      <div
        id="dropdown"
        class="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44"
      >
        <ul class="py-2" aria-labelledby="dropdownButton">
          <li>
            <a
              href="#"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >Edit</a
            >
          </li>
          <li>
            <a
              href="#"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >Export Data</a
            >
          </li>
          <li>
            <a
              href="#"
              class="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >Delete</a
            >
          </li>
        </ul>
      </div>
    </div>
    <div class="flex flex-col items-center pb-10">
      <img
        class="w-24 h-24 mb-3 rounded-full shadow-lg"
        :src="url"
        alt="Bonnie image"
      />
      <h5 class="mb-1 text-xl font-medium text-gray-900">
        {{ name }}
      </h5>
      <span class="text-sm text-gray-500 dark:text-gray-400"
        >$ {{ price }}</span
      >
      <span class="text-sm text-gray-500 dark:text-gray-400">
        Qty: {{ qty }}</span
      >
      <div class="flex mt-4 md:mt-6">
        <button
          @click="addProductToDatabase"
          href="#"
          class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 hover:bg-cyan-700 rounded-lg"
        >
          Add Product
        </button>
        <button
          @click="deleteProductFromDatabase"
          href="#"
          class="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
        >
          Delete
        </button>
      </div>
      <div class="text-xs text-gray-400 mt-3">
        <p>Use these options to add and delete to the Database</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["id", "name", "price", "url", "qty", "totalPrice"],
  methods: {
    async deleteProduct() {
      await axios
        .post("/api/deleteadminProducts", {
          url: this.url,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });

      alert("Item Deleted Successfully!!");
    },
    async addProductToDatabase() {
      await axios
        .post("/api/addProduct", {
          id: this.id,
          name: this.name,
          price: this.price,
          imageUrl: this.url,
          qty: this.qty,
          totalPrice: this.totalPrice
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });

      alert("Item added to the database!!");
    },
    async deleteProductFromDatabase() {
      await axios
        .post("/api/deleteProduct", {
          id: this.id,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });

      alert("Item deleted from the database!!");
    },
  },
};
</script>