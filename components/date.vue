<template>
    <span>{{ day+" "+month+" "+year }}</span>
</template>

<script>
export default {

	name:"DateComponent",

    data: () => ({
        day:"",
		month:"",
		year:"",
        months:[
			'Enero',
			'Febrero',
			'Marzo',
			'Abril',
			'Mayo',
			'Junio',
			'Julio',
			'Agosto',
			'Septiembre',
			'Octubre',
			'Noviembre',
			'Diciembre'
		],
    }),

    created(){
		this.setDate();
	},

    methods:{
		setDate()
		{
			const cd = new Date();
			this.day = cd.getDate()
			this.month = this.months[cd.getMonth()]
			this.year = this.zeroPadding(cd.getFullYear(), 4)
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