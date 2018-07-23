var vueApp = new Vue({
    el: '#vueDiv',
    data: {
        Brand: 'Surrey Golf',
        Product: 'Putter',
        Desc: 'Odyssey EXO Seven Putter',
        //image: '../Images/putters-1.png',
        selVariant: 0,
        clink: 'https://www.callawaygolf.com/clubs/odyssey-putters/exo/putters-2018-exo-seven.html',
        //stock: 100,
        lots: true,
        parts: ['Grip Rubber', 'Shaft Steel', 'Head Titanium'],
        variants: [{ vId: 1, vColour: 'Red', vImage: '../Images/putters-1.png', vStock: 20 },
            { vId: 2, vColour: 'Black', vImage: '../Images/BlackGrip-1-12185.png', vStock: 0 }],
        ordered: 0
    },
    methods: {
        addToCart: function () {
            vueApp.ordered += 1;
        },
        subFromCart: function () {
            if (this.ordered > 0)
                this.ordered -= 1;
        },
        changeImage (vImage) {
            this.image = vImage;
        },
        changeImageByIndex (ind) {
            this.selVariant = ind;
            console.log('Index:' + ind);
        }
    },
    computed: {
        prodTitle() {
            return this.Brand + ' - ' + this.Product;
        },
        image() {
            return this.variants[this.selVariant].vImage;
        },
        stock() {
            return this.variants[this.selVariant].vStock;
        }

    }

})
