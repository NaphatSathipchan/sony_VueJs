<template>
    <div class="relative flex items-center justify-center">
        <input type="search" v-model="searchQuery" @input="filter"
            class="text-[14px] rounded-[14px] h-[45px] pl-[40px] pr-[10px] w-[300px] border border-[#1C1C1C] focus:outline-none font-Kanit font-thin"
            placeholder="ชื่อหรือรหัสพนักงาน">
        <div class="absolute left-0 ml-3">
            <svg class="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
        </div>
        <!-- <p>{{ this.$store.state.data_transaction }}</p> -->
    </div>
</template>

<script>

export default {
    
    data() {
        return {
            searchQuery: '',
            employees: [], // This should be populated with your data, either from a local variable or an API call
            filteredEmployees: []
        }
    },
    
    methods: {
        filter() {
            if (this.searchQuery) {
                this.filteredEmployees = this.$store.state.data_transaction.filter(employee => {
                    // Use optional chaining and ensure the property exists before calling includes
                    const nameIncludesQuery = employee?.Name?.includes(this.searchQuery);
                    // Check if id is not null or undefined before converting to string and calling includes
                    const idIncludesQuery = employee.id != null && employee.id.toString().includes(this.searchQuery);
                    return nameIncludesQuery || idIncludesQuery;
                });
            } else {
                this.filteredEmployees = this.$store.state.data_transaction;
            }
        }

    },
    mounted() {
        // Here you would fetch your employees data and assign it to this.employees
        // After fetching your data, you can set filteredEmployees to the full list
        this.filteredEmployees = this.$store.state.data_transaction;
        
    }
};
</script>
