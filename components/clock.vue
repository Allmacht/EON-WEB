<template>
    <span>{{ clock }}</span>
</template>

<script>
export default {
	name:"ClockComponent",

    data: () => ({
        ticker:null,
        clock:"00:00:00",
    }),

    created(){
		this.tiker = setInterval(() => { this.clock = this.updateTime() }, 1000);
	},

    methods:{
		updateTime()
		{
			const cd = new Date();
    		const time = this.zeroPadding(cd.getHours(), 2) + ':' + this.zeroPadding(cd.getMinutes(), 2) + ':' + this.zeroPadding(cd.getSeconds(), 2);
			return time
		},
		
		zeroPadding(num, digit)
		{
			let zero = '';
			for(let i = 0; i < digit; i++) {
				zero += '0';
			}
			return (zero + num).slice(-digit);
		}
	}
    
}
</script>