<template>
    <div class="flex h-screen bg-[#F5F8FF] font-Kanit">
      <div class="flex flex-[0.1] items-center content-center justify-center">
        <BTTabbar />
      </div>
      <!-- main container -->
      <div class="w-full bg-white rounded-[14px] mx-[20px] my-[40px] flex-[0.9] p-[30px] shadow-md overflow-y-scroll">
        <!-- section_1 -->
        <div class="flex flex-row justify-between items-center">
          <p class="text-[64px] font-Kanit text-[#1C1C1C]">Transaction</p>
          <div class="flex flex-col items-center">
            <p class="text-[#788AA3] text-[16px]">{{ Date }}</p>
            <p class="text-[#1C1C1C] text-[48px]">{{ Time }}</p>
          </div>
        </div>
        <!-- button swap transaction and camera -->
        <div class="p-[12px] flex justify-between">
          <!-- button -->
          <div class="flex">
            <div class="mr-[10px]">
              <BTMenuIcon :icon="Trans" text="" BgColor="#F5F8FF" link="transaction"/>
            </div>
            <div>
              <BTMenuIcon :icon="CamIcon" text="" BgColor="#F5F8FF" link="camera"/>
            </div>
          </div>
          <!-- searchbar_container -->
          <div class="flex flex-row border-b-[1px] border-[#1C1C1C] items-center py-2">
            <!-- searchbar -->
            <div class="relative flex items-center justify-center">
          <input type="search" v-model="searchQuery" @input="filter"
              class="text-[14px] rounded-[14px] h-[45px] pl-[40px] pr-[10px] w-[300px] border border-[#1C1C1C] focus:outline-none font-Kanit font-thin"
              placeholder="ชื่อหรือรหัสพนักงาน" >
              
          <div class="absolute left-0 ml-3">
              <svg class="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
          </div>
          <!-- <p>{{ this.$store.state.data_transaction }}</p> -->
      </div>
            <!-- dropdown_container -->
            <div class="flex flex-col items-start ml-[20px]" @click="toggleDropdown">
        <!-- title -->
        <!-- <p class="text-[12px] text-[#1C1C1C]">camera</p> -->
        <!-- dropdown -->
        <div class="relative cursor-pointer">
          <div class="bg-[#1C1C1C] py-[8px] px-[10px] justify-between flex rounded-[10px] items-center">
            <!-- text -->
            <p class="text-[16px] text-[#FFF] mr-[50px]">{{ selectedOption || 'All' }}</p>
            <!-- icon -->
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-4 h-4" style="fill: white">
                <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/>
              </svg>
            </div>
          </div>
          <!-- Dropdown menu -->
          <ul v-if="isOpen" class="absolute top-full left-0 w-[100%] bg-white rounded-[10px] mt-1">
            <li @click="selectOption('All')" class="py-[5px] px-[10px] cursor-pointer hover:bg-gray-200">All</li>
            <li @click="selectOption(1)" class="py-[5px] px-[10px] cursor-pointer hover:bg-gray-200">Camera 1</li>
            <li @click="selectOption(2)" class="py-[5px] px-[10px] cursor-pointer hover:bg-gray-200">Camera 2</li>
          </ul>
        </div>
      </div>
          </div>
        </div>
        <!-- transactioncard section -->
        <div class="flex flex-row flex-wrap" v-for="item in filteredEmployees" :key="1" >
          <BTTransactionCard
            :key="1"
            :Name="'ลุงตู่'"
            :CameraNo="1"
            :DateTime="12/5/2024"
            :EmployeeID="1111"
            :Image="'https://scontent.fbkk5-6.fna.fbcdn.net/v/t39.30808-6/279386693_1887406214796892_6195755929341865402_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeE_dRPgWnHKQ6wNw2eJZdv2jeohphgrtgON6iGmGCu2A88u67eNtgO-7NsNOXNqUySfmy4_3BGhMMiuZsJd0Sq_&_nc_ohc=zCIqrd80TZwAX_LRkYH&_nc_ht=scontent.fbkk5-6.fna&oh=00_AfCfok5hqRhf_f7r2myUnZbqP9asIYklVoXzHKTx3JFsbA&oe=65F1C267'"
          />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import BTTabbar from "../components/BTTabbar.vue";
  import BTTransactionCard from "../components/BTTransactionCard.vue";
  import BTMenuIcon from "../components/BTMenuIcon.vue";
  import BTSearchBar from "../components/BTSearchBar.vue";
  import BTDropdown from "../components/BTDropdown.vue";
  import axios, { all } from 'axios';
  
  export default {
    components: {
      BTTabbar,
      BTTransactionCard,
      BTMenuIcon,
      BTSearchBar,
      BTDropdown
    },
    data() {
      return {
        isOpen: false,
        selectedOption: 'All',
        data: [],
        CamIcon: `
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="22" viewBox="0 0 30 22" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M5.23272 7.40305C4.6804 7.22673 3.4722 6.96385 2.49342 7.6176C1.73557 8.12372 1.05207 9.20394 1.04994 11.4477H0.531079C0.237924 11.4477 0 11.6857 0 11.9788V21.0072C0 21.3003 0.237924 21.5383 0.531079 21.5383H1.59324C2.01598 21.5383 2.42119 21.3704 2.71966 21.0714C3.01865 20.773 3.18648 20.3678 3.18648 19.945V18.0862H5.57633C6.07767 18.0862 6.5259 17.8542 6.81746 17.4914C6.84508 17.4728 6.8711 17.4511 6.89553 17.4266L12.7656 11.5566L22.2012 14.0851C22.4843 14.161 22.7753 13.9927 22.8513 13.7096L23.077 12.8684L24.9236 13.3628C25.7738 13.5907 26.6474 13.0867 26.8747 12.2364L27.468 10.0239L29.6602 7.98139C29.9438 7.71692 30.0623 7.31914 29.9683 6.94313C29.8748 6.5666 29.5843 6.27026 29.2094 6.16988L6.37561 0.0364477C6.10369 -0.0368412 5.81373 0.0013967 5.56943 0.142133C5.32513 0.282869 5.14722 0.51495 5.07446 0.786863L3.76004 5.69085C3.68463 5.97445 3.85245 6.26548 4.13551 6.34142L5.44356 6.69193L5.23272 7.40305ZM1.59005 12.5099H1.06216V20.4761H1.59324C1.73397 20.4761 1.8694 20.4203 1.96871 20.3205C2.06855 20.2212 2.12432 20.0858 2.12432 19.945V13.041C2.12432 12.9003 2.06855 12.7648 1.96871 12.6655C1.8694 12.5662 1.7345 12.5099 1.5943 12.5099C1.59271 12.5099 1.59111 12.5099 1.59005 12.5099ZM3.18648 15.9619V17.0241H4.07391C4.01496 16.8579 3.98309 16.6794 3.98309 16.493C3.98309 16.3066 4.01496 16.1282 4.07391 15.9619H3.18648ZM5.57633 15.9619C5.86949 15.9619 6.10741 16.1998 6.10741 16.493C6.10741 16.7862 5.86949 17.0241 5.57633 17.0241C5.28318 17.0241 5.04525 16.7862 5.04525 16.493C5.04525 16.1998 5.28318 15.9619 5.57633 15.9619ZM7.01396 15.8063L11.5807 11.2396L10.3964 10.922L6.26302 15.0554C6.59123 15.212 6.8573 15.4781 7.01396 15.8063ZM4.9332 8.41369C4.5933 8.28677 3.75579 8.05203 3.08292 8.50132C2.49289 8.89538 2.09192 9.7775 2.11157 11.5343C2.33834 11.6124 2.54706 11.7414 2.71966 11.9146C3.01865 12.213 3.18648 12.6182 3.18648 13.041V14.8998H4.9162L9.21157 10.6044L5.17324 9.52259C5.03516 9.48541 4.91726 9.39406 4.84716 9.26926C4.77759 9.14393 4.76113 8.99629 4.80149 8.85874L4.9332 8.41369ZM6.46961 6.96703L5.97464 8.63781L21.9628 12.9215L22.958 9.20766L21.4179 8.79501L20.0759 10.3086C19.9426 10.4589 19.7354 10.5215 19.5411 10.4695L6.46961 6.96703ZM26.3437 10.1147L25.8492 11.9613C25.7733 12.2449 25.4817 12.4132 25.1987 12.3373L23.3516 11.8423L23.9841 9.48222L26.3437 10.1147ZM26.8477 9.1503L28.9364 7.20443C28.9374 7.20283 28.938 7.20124 28.938 7.19911C28.9374 7.19752 28.9359 7.19593 28.9343 7.1954L6.10051 1.06196L4.92364 5.45293L5.54447 5.61968C5.55031 5.62075 5.55615 5.62234 5.56199 5.62393L19.4991 9.35848L20.8411 7.84438C20.9744 7.69408 21.1816 7.63194 21.3759 7.68399L26.8477 9.1503ZM13.3062 4.62019C13.6801 4.72004 13.9021 5.10507 13.8022 5.47842C13.7018 5.8523 13.3173 6.07429 12.9435 5.97445C12.5696 5.87407 12.3476 5.48957 12.448 5.11569C12.5478 4.74181 12.9323 4.51982 13.3062 4.62019ZM10.5977 3.89421C10.9716 3.99458 11.1936 4.37908 11.0932 4.75296C10.9933 5.12631 10.6083 5.34883 10.235 5.24846C9.86108 5.14862 9.63909 4.76358 9.73893 4.3897C9.83931 4.01636 10.2238 3.79383 10.5977 3.89421ZM7.88918 3.16822C8.26306 3.2686 8.48505 3.6531 8.38468 4.02698C8.28484 4.40086 7.89981 4.62285 7.52646 4.52301C7.15258 4.42263 6.93059 4.03813 7.03043 3.66425C7.1308 3.29037 7.5153 3.06838 7.88918 3.16822Z" fill="black"/>
          </svg>
        `,
        Trans:`
        <svg width="30" height="22" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M13.3333 6.66669V18.3334H3.33333V6.66669H13.3333ZM10 10H6.66666V15H10V10ZM36.6667 21.6667V33.3334H26.6667V21.6667H36.6667ZM33.3333 25H30V30H33.3333V25ZM36.6667 6.66669V18.3334H16.6667V6.66669H36.6667ZM33.3333 10H20V15H33.3333V10ZM23.3333 21.6667V33.3334H3.33333V21.6667H23.3333ZM20 25H6.66666V30H20V25Z" fill="black"/>
        </svg>
        `,
        
        Date: new Date().toLocaleString().split(' ')[0],
        Time: new Date().toLocaleString().split(' ')[1],
        
        // filteredEmployees:[]
      };
    },
    created() {
      // Update time every second
      setInterval(() => {
        this.Time = new Date().toLocaleString().split(' ')[1];
      }, 1000);
  
      this.fetchData();
    },
    methods: {
      toggleDropdown() {
        this.isOpen = !this.isOpen;
      },
      selectOption(option) {
        if (option === 'All') {
          this.selectedOption = 'All';
        } else {
          this.selectedOption = Number(option); // Ensure numeric value for CameraNo comparison
        }
        this.isOpen = false;
        // this.filter();
      },
      async fetchData() {
        try {
          const response = await axios.get('http://43.239.251.75:8000/api/Transaction');
          this.data = response.data.reverse();
          this.filteredEmployees = [...this.data]; // Initialize filteredEmployees with fetched data
          this.$store.dispatch('appendTransaction', this.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      },
       filter() {
        // Convert search query to lowercase for case-insensitive comparison
        const searchLower = this.searchQuery.toLowerCase().trim();

        this.filteredEmployees = this.data.filter(employee => {
          // Handle the 'All' case or ensure selectedOption is a number for comparison
          const cameraMatch = this.selectedOption === 'All' || employee.CameraNo === Number(this.selectedOption);

          // If there's a search query, also check if the name or employee ID includes it
          const nameIncludesQuery = employee?.Name?.toLowerCase().includes(searchLower);
          const idIncludesQuery = employee?.EmployeeID?.toString().toLowerCase().includes(searchLower);
          return cameraMatch && (!searchLower || nameIncludesQuery || idIncludesQuery);
        });
      },
    },
    watch: {
      searchQuery() {
        this.filter();
      }
    },
  };
  </script>
  
  <style scoped>
  .flex-row-wrap {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    position: relative;
    width: 700px;
    gap: 10px;
    
  }
</style>