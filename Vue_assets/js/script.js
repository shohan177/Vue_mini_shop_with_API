

const root = new Vue({
    el: "#root",
    data: {
        users:[],
        users_length: false,
        search:"",
        gender:"",
        location:"",
        age_min: 0,
        age_max: 100,
        empty_mess: "",
        show: false,
        more_search: false,
        show_user: false,
        user:{
            photo: "",
            name: "",
            email: "",
            phone: "",
            age: "",
            address: "",
            gender: "",
        },
        edit_user:{
            id:"",
            photo: "",
            photo_file: "",
            name: "",
            email: "",
            phone: "",
            age: "",
            address: "",
            gender: "",

        },
    },
    methods: {
        //get all user
        getData: function(){
           
            axios.get('inc/data.php?action=show').then(function (response) {
                root.users = response.data;
                
            });
        },
        //add user

        //{
        //     name: root.user.name,
        //     email: root.user.email,
        //     phone: root.user.phone
        // }

        addData: function(){
            root.user.photo = root.$refs.file.files[0];
          
            
            let userData = new FormData();
            if (root.user.photo == "" ||root.user.name == "" ||root.user.email == "" ||root.user.phone == "" ||root.user.address == "" ||root.user.gender == "" ||root.user.age == "" ) {
                
                    
                root.empty_mess = "All file required !";
                    
       
            } else {
                root.empty_mess = "";
                userData.append('photo',root.user.photo)
                userData.append('name',root.user.name)
                userData.append('email',root.user.email)
                userData.append('phone',root.user.phone)
                userData.append('gender',root.user.gender)
                userData.append('address',root.user.address)
                userData.append('age',root.user.age)
              
                axios.post('inc/data.php?action=add',userData,{
                    header:{
                        'content-type':'multipart/form-data'
                    }
                }).then(function(responce){
                    console.log(responce.data);
                    root.getData();
                    root.resetInput();
                    toastr.success('Success','data Save succfull',{
                        positionClass:'toast-top-right',
                        progressBar:true,
    
    
                    });
                
    
                });
            }
            
        },
        //delete user
        deleteData: function(id ,event){
            event.preventDefault();
            Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
            if (result.isConfirmed) {
                axios.get('inc/data.php?action=delete&id='+id).then(function(responce){
                    root.getData();
                })
                toastr.error('Delete','data delete succfull',{
                    positionClass:'toast-top-right',
                    progressBar:true,


                });
            }
            })
        },

        //search item 
        searchItem: function(){
            
            axios.post('inc/data.php?action=search',{
                search: root.search,
                gender: root.gender,
                location: root.location,
                age_min: root.age_min,
                age_max: root.age_max
            }).then(function(responce){
                //console.log(responce.data);
                
                root.users = responce.data;
                let length = responce.data.length;
                if (length == 0) {
                    root.users_length = true;
                } else {
                    root.users_length = false;
                    
                }

            })
        },
        // reset all search 
        resetSearch: function(){
            root.search = "" ;
            root.gender = "";
            root.location = "";
            root.age_min = 0;
            root.age_max = 100;
            root.getData();
            root.users_length = false;
            root.more_search= false;
            
            
        },
        // reset input fild data
        resetInput: function(){
            root.user.photo="";
            root.user.name="";
            root.user.email="";
            root.user.phone="";
            root.user.age="";
            root.user.address="";
            root.user.gender="";
            this.$refs.file.value = '';
            root.empty_mess = "";
            


        },
        //show single user 
        showSingleUser: function(id,action){
            
            if (action == "show") {
                root.show_user = true;
            }else{
                root.show_user = false;
            }
            
            root.lodeSingleUserdata(id);
            
        },
        //load single user
        lodeSingleUserdata: function(id){
            axios.get('inc/data.php?action=singleShow&id='+id).then(function(responce){
                root.show= true;
                root.single_user = responce.data;

                root.single_user.forEach(element => {
                    //load singel user data 
                    root.edit_user.photo= element.photo;
                    root.edit_user.name= element.name;
                    root.edit_user.email= element.email;
                    root.edit_user.phone= element.phone;
                    root.edit_user.age= element.age;
                    root.edit_user.address= element.address;
                    root.edit_user.gender= element.gender;
                    root.edit_user.id= element.id;
                   
                });

            })
        },
        // update user
        UpdateData: function(){

            root.edit_user.photo_file = root.$refs.update_file.files[0];
          
            
            let upadateUserData = new FormData();
            if (root.edit_user.photo == "" ||root.edit_user.name == "" ||root.edit_user.email == "" ||root.edit_user.phone == "" ||root.edit_user.address == "" ||root.edit_user.gender == "" ||root.edit_user.age == "" ) {
                
                
                        toastr.error('required','All fild required',{
                        positionClass:'toast-top-right',
                        progressBar:true,
    
    
                    });
                    
       
            } else {
   
                upadateUserData.append('photo',root.edit_user.photo_file)
                upadateUserData.append('photo_old',root.edit_user.photo)
                upadateUserData.append('name',root.edit_user.name)
                upadateUserData.append('email',root.edit_user.email)
                upadateUserData.append('phone',root.edit_user.phone)
                upadateUserData.append('gender',root.edit_user.gender)
                upadateUserData.append('address',root.edit_user.address)
                upadateUserData.append('age',root.edit_user.age)
                let id = root.edit_user.id;
              
                axios.post('inc/data.php?action=update&id='+id,upadateUserData,{
                    header:{
                        'content-type':'multipart/form-data'
                    }
                }).then(function(responce){
                    root.lodeSingleUserdata(responce.data);
                    root.getData();
                    root.resetInput();
                    
                    toastr.success('Success','data Update succfull',{
                        positionClass:'toast-top-right',
                        progressBar:true,
                        
                    });
                    root.$refs.update_file.value = '';
                
    
                });
            }
            
        },

       
    },

    created: function () {
        this.getData();

    }




});