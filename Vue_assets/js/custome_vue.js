let root = new Vue({
    el:'#shop',
    data:{
        products:[],
        categories:[],
        card:[],
        url:'http://127.0.0.1:8000/',
        searchItem:"",
        singleView: false,
    },
    methods: {
        // get all product 
        getAllProductData: function(){
      
            axios.get(this.url+'api/allproduct/').then(function(responce){
                root.products = responce.data;
            });
        },
        clear: function(event){
            event.preventDefault();
            this.singleView = false;
            axios.get(this.url+'api/allproduct/').then(function(responce){
                root.products = responce.data;
            });
        },
        // get all category
        getAllCategoryData: function(){
            axios.get(this.url+'api/allcategory').then(function(responce){
                root.categories = responce.data;
            });
        },
        //filter
        filter: function(event){
            event.preventDefault();

            if (this.searchItem == "") {
                axios.get(this.url+'api/allproduct/').then(function(responce){
                    root.products = responce.data;
                });
            } else {
                axios.get(this.url+'api/product/filter/'+root.searchItem).then(function(responce){
                    root.products = responce.data;
                });
            }
            axios.get(this.url+'api/product/category/'+slug).then(function(responce){
                root.products = responce.data;
            });
            
        },
        //filter by catagory
        categoryFilter: function(slug,event){
            event.preventDefault();
            this.singleView= false;
            axios.get(this.url+'api/product/category/'+slug).then(function(responce){
                root.products = responce.data;
            });
            
        },
        //single product view
        singleProduct: function(id,event){
            event.preventDefault();
            this.singleView = true;
            axios.get(this.url+'api/product/'+id).then(function(responce){
                root.products = responce.data;
            });
        },
        //all card 
        allCardItem: function(){
            axios.get(this.url+'api/card').then(function(responce){
                root.card = responce.data;
            });
        },
        // add to card 
        addToCard: function(id,event){
            event.preventDefault();
            axios.get(this.url+'api/card/add/'+id).then(function(responce){
                root.allCardItem();
            });
        },
        //delete product form card
        delProductformCard: function(id,event){
            event.preventDefault();
            axios.get(this.url+'api/card/del/'+id).then(function(responce){
                root.allCardItem();
            });
        }

        
    },
    created: function() {
        this.getAllProductData();
        this.getAllCategoryData();
        this.allCardItem();
    },
})