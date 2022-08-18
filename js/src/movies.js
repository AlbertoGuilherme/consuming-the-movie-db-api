var app = new Vue({
    el: '#app',
    data: {
      source:'',  
      tab_tvshows:[],
      tab_movies:[],
      imagePath:"http://image.tmdb.org/t/p/w500/",
      page:1,
      title:'',
      poster:'',
      overview:'',
      release_date:'',
      vote_avg:'',
      vote_count:'',
      lang:'',
      loading:false

    },
    created:function(){
        this.showData();
        this.showDataTv();
    },
    methods:{
      
        read_more: function(index){
            this.title = this.tab_movies[index].title;
            this.overview = this.tab_movies[index].overview;
            this.poster = this.imagePath+this.tab_movies[index].poster_path;
            this.release_date = this.tab_movies[index].release_date;
            this.vote_avg = this.tab_movies[index].vote_average;
            this.vote_count = this.tab_movies[index].vote_count;
            this.lang = this.tab_movies[index].original_language;
            $('#ShowInfo').modal('show')
        },

        read_more_tv: function(index){
            
            //TVSHOW
            this.name = this.tab_tvshows[index].name;
            this.overview = this.tab_tvshows[index].overview;
            this.poster = this.imagePath+this.tab_tvshows[index].poster_path;//obtem o path da imagem
            this.release_date = this.tab_tvshows[index].release_date;
            this.vote_avg = this.tab_tvshows[index].vote_average;
            this.vote_count = this.tab_tvshows[index].vote_count;
            this.lang = this.tab_tvshows[index].original_language;
            $('#ShowInfo').modal('show')
        },

        load_more:function(){
            this.loading=true;
            this.page = this.page+1;
            const API_KEY = '2d8357ec8381c96d3875eb8b8c718fe8';
            const API_URL = "https://api.themoviedb.org/3/movie/popular?api_key="+API_KEY+"&language=en-US&page="+this.page;
           
            axios.get(API_URL)
              .then(function (response) {

                   for(i=0;i<response.data.results.length;i++)
                    app.tab_movies.push(response.data.results[i]);

                   app.loading=false;

              })

            
        },
        load_more_tv:function(){
            this.loading=true;
            this.page = this.page+1;
            const API_KEY = '2d8357ec8381c96d3875eb8b8c718fe8';
            const API_URL_TV = "https://api.themoviedb.org/3/tv/popular?api_key="+API_KEY+"&language=en-US&page="+this.page;

              axios.get(API_URL_TV)
              .then(function (response) {

                   for(i=0;i<response.data.results.length;i++)
                    app.tab_tvshows.push(response.data.results[i]);

                   app.loading=false;

              })  
        },
        showData:function(){
            const API_KEY = '2d8357ec8381c96d3875eb8b8c718fe8';
            const API_URL = "https://api.themoviedb.org/3/movie/popular?api_key="+API_KEY+"&language=en-US&page="+this.page;

               axios.get(API_URL)
              .then(function (response) {
                app.tab_movies = response.data.results;
              });

        },

        showDataTv:function(){
            const API_KEY = '2d8357ec8381c96d3875eb8b8c718fe8';
            const API_URL_TV = "https://api.themoviedb.org/3/tv/popular?api_key="+API_KEY+"&language=en-US&page="+this.page;

     
              axios.get(API_URL_TV)
              .then(function (response) {
                app.tab_tvshows = response.data.results;
              });
        }

        
    },

    computed:{
        filteredMovies: function(){
                return this.tab_movies.filter((results)=>{
                        return results.title.toLowerCase().match(this.source.toLowerCase())
                })
        },
        filteredTvShow: function(){
            return this.tab_tvshows.filter((results)=>{
                    return results.name.toLowerCase().match(this.source.toLowerCase())
            })
    }
    }

  })

