var vueApp = new Vue({
    el: '#vueDiv',
    data: {
        Product: 'Putter',
        Desc: 'Odyssey EXO Seven Putter',
        image: '../Images/putters-1.png',
        clink: 'https://www.callawaygolf.com/clubs/odyssey-putters/exo/putters-2018-exo-seven.html',
        stock: 100,
        lots: true,
        parts: ['Grip Rubber', 'Shaft Steel', 'Head Titanium'],
        variants: [{ vId: 1, vColour: 'Red', vImage: '../Images/putters-1.png' },
            { vId: 2, vColour: 'Black', vImage: '../Images/BlackGrip-1-12185.png' }],
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
        }
    }
})
