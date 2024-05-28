document.addEventListener('DOMContentLoaded', () => {
    const API_KEY = '00a695c44fc0d3305c341bc5ec26258c'; // TMDB API 키
    const API_URL = 'https://api.themoviedb.org/3';
    const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w200';

    // 로그인 폼 처리
    document.getElementById('loginForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        // 로그인 로직 추가
        window.location.href = 'main.html';
    });

    // 회원가입 폼 처리
    document.getElementById('signupForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        // 회원가입 로직 추가
        window.location.href = 'main.html';
    });

    // 로그아웃 버튼 처리
    document.getElementById('logoutButton')?.addEventListener('click', () => {
        // 로그아웃 로직 추가
        window.location.href = 'login.html';
    });

    // 메인 페이지에 영화 표시
    const moviesContainer = document.getElementById('moviesContainer');
    if (moviesContainer) {
        const userPreferences = JSON.parse(localStorage.getItem('userPreferences')) || [];
        userPreferences.forEach((preference) => {
            fetchMoviesByGenre(preference).then(movies => {
                const genreRow = document.createElement('div');
                genreRow.classList.add('genre-row');
                genreRow.innerHTML = `<h2>${preference}</h2>`;
                movies.forEach(movie => {
                    const movieElement = document.createElement('div');
                    movieElement.classList.add('movie-poster');
                    movieElement.innerHTML = `<img src="${IMAGE_BASE_URL}${movie.poster_path}" alt="${movie.title}">`;
                    movieElement.addEventListener('click', () => showMovieDetails(movie));
                    genreRow.appendChild(movieElement);
                });
                moviesContainer.appendChild(genreRow);
            });
        });
    }

    // 장르별 영화 데이터 가져오기
    async function fetchMoviesByGenre(genre) {
        const genreId = await getGenreId(genre);
        const response = await fetch(`${API_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`);
        const data = await response.json();
        return data.results;
    }

    // 장르 ID 가져오기
    async function getGenreId(genreName) {
        const response = await fetch(`${API_URL}/genre/movie/list?api_key=${API_KEY}`);
        const data = await response.json();
        const genre = data.genres.find(g => g.name.toLowerCase() === genreName.toLowerCase());
        return genre.id;
    }

    // 모달에 영화 상세 정보 표시
    const showMovieDetails = (movie) => {
        document.getElementById('trailer').src = `https://www.youtube.com/embed/${movie.trailer}?autoplay=1`;
        document.getElementById('movieTitle').innerText = movie.title;
        document.getElementById('movieGenre').innerText = `Genre: ${movie.genre}`;
        document.getElementById('movieRating').innerText = `Rating: ${movie.vote_average}`;
        document.getElementById('userRating').innerText = `User Rating: ${movie.user_rating}`;
        document.getElementById('movieViews').innerText = `Views: ${movie.popularity}`;
        document.getElementById('releaseDate').innerText = `Release Date: ${movie.release_date}`;
        document.getElementById('movieDescription').innerText = movie.overview;
        document.getElementById('movieModal').style.display = 'flex';
    };

    // 모달 닫기
    document.getElementById('closeModal')?.addEventListener('click', () => {
        document.getElementById('trailer').src = '';
        document.getElementById('movieModal').style.display = 'none';
    });

    // 프로필 페이지에 유저 데이터 로드
    if (document.getElementById('profileForm')) {
        const userPreferences = JSON.parse(localStorage.getItem('userPreferences')) || [];
        userPreferences.forEach(preference => {
            document.getElementById(preference.toLowerCase())?.setAttribute('checked', true);
        });

        document.getElementById('cancelButton').addEventListener('click', () => {
            window.location.href = 'main.html';
        });

        document.getElementById('profileForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const newPreferences = [];
            document.querySelectorAll('.preferences input[type="checkbox"]').forEach(checkbox => {
                if (checkbox.checked) {
                    newPreferences.push(checkbox.value);
                }
            });
            // 업데이트된 취향 저장
            localStorage.setItem('userPreferences', JSON.stringify(newPreferences));
            window.location.href = 'main.html';
        });
    }
});
