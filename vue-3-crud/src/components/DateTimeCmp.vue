
<template>
    <Datepicker v-model="date" :format="format" @textSubmit="selectDate" ></Datepicker>
    <!-- <h3> {{ date }}</h3> -->
</template>

<script>
    import Datepicker from '@vuepic/vue-datepicker';
    import '@vuepic/vue-datepicker/dist/main.css'
    
    export default {
        components: { Datepicker },
        props: ["defaultTime"],
        data() {
            return {
                date: null
            };
        },
        mounted(){
            // console.log("I am in the dateTime component the default date is |",this.defaultTime,"|");
            this.date = new Date(this.defaultTime);
            // console.log('this.date = ',this.date);
        },
        updated(){
            const day      = this.date.getDate();
            const month    = this.date.getMonth() + 1;
            const year     = this.date.getFullYear();
            const hour     = this.date.getHours();
            const minute  = this.date.getMinutes();
            const  time = {
                            day,
                            month,
                            year,
                            hour,
                            minute,
                        }
            // console.log(this.time);
            // alert('Updated');
            this.DateUpdated(time);
        },
        methods: {
            DateUpdated(time){
                console.log("DateUpdated");
                // Update the display in the Table Component
                this.$emit('DateUpdated', time)
            },
            format (date) {
                const day = date.getDate();
                const month = date.getMonth() + 1;
                const year = date.getFullYear();
                const hour = date.getHours();
                const minute = date.getMinutes();
                let zero_month = '' 
                let zero_day = ''
                let zero_hour = ''
                let zero_minute = ''

                if(month < 10){
                    zero_month = '0'
                }
                if(day < 10 ){
                    zero_day = '0'
                }
                if(hour < 10 ){
                    zero_hour = '0'
                }
                if(minute < 10 ){
                    zero_minute = '0'
                }
            return ` ${year}/${zero_month}${month}/${zero_day}${day}, ${zero_hour}${hour}:${zero_minute}${minute}`;
        },

        selectDate(){
            alert("wch");
        }


        }
    }
</script>
