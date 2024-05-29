document.addEventListener('DOMContentLoaded', () => {
    const API_KEY = '00a695c44fc0d3305c341bc5ec26258c'; // TMDB API 키
    const API_URL = 'https://api.themoviedb.org/3';
    const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w200';

    let sortBy = 'rating'; // 기본 정렬 기준

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

    // 정렬 기준 선택 처리
    document.getElementById('sortSelect')?.addEventListener('change', (e) => {
        sortBy = e.target.value;
        displayMovies();
    });

    // 메인 페이지에 영화 표시
    const moviesContainer = document.getElementById('moviesContainer');
    if (moviesContainer) {
        displayMovies();
    }

    // 장르 ID 가져오기
    async function getGenreId(genreName) {
        const response = await fetch(`${API_URL}/genre/movie/list?api_key=${API_KEY}&language=ko-KR`);
        const data = await response.json();
        const genre = data.genres.find(g => g.name.toLowerCase() === genreName.toLowerCase());
        return genre.id;
    }

   // 장르별 영화 데이터 가져오기
    async function fetchMoviesByGenre(genre) {
        const genreId = await getGenreId(genre);
        const response = await fetch(`${API_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&language=ko-KR`);
        const data = await response.json();
        return data.results;
    }

    // 메인 페이지에 영화 display
    async function displayMovies() {
        const userPreferences = JSON.parse(localStorage.getItem('userPreferences')) || [];
        moviesContainer.innerHTML = ''; // 기존 영화 목록 초기화
        for (const preference of userPreferences) {
            const movies = await fetchMoviesByGenre(preference);
            movies.sort((a, b) => {
                if (sortBy === 'rating') {
                    return b.vote_average - a.vote_average;
                } else if (sortBy === 'views') {
                    return b.popularity - a.popularity;
                } else if (sortBy === 'release_date') {
                    return new Date(b.release_date) - new Date(a.release_date);
                }
            });
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
        }
    }

    // 영화의 트레일러 영상 URL 가져오기
    async function fetchMovieTrailer(movieId) {
        const response = await fetch(`${API_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=ko-KR`);
        const data = await response.json();
        const trailer = data.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
        return trailer ? `https://www.youtube.com/embed/${trailer.key}?autoplay=1` : '';
    }

    // 모달에 영화 상세 정보 표시
    const showMovieDetails = async (movie) => {
        const trailerUrl = await fetchMovieTrailer(movie.id);
        document.getElementById('trailer').src = trailerUrl;
        document.getElementById('movieTitle').innerText = movie.title;
        document.getElementById('movieRating').innerText = `평점: ${movie.vote_average}`;
        document.getElementById('movieViews').innerText = `조회수: ${movie.popularity}`;
        document.getElementById('releaseDate').innerText = `개봉일: ${movie.release_date}`;
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
            const checkbox = document.getElementById(preference);
            if (checkbox) {
                checkbox.checked = true;
            }
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
    
    // 전체 체크 버튼 처리
    document.getElementById('selectAllButton')?.addEventListener('click', () => {
        const checkboxes = document.querySelectorAll('.preferences input[type="checkbox"]');
        const allChecked = Array.from(checkboxes).every(checkbox => checkbox.checked);
        checkboxes.forEach(checkbox => {
            checkbox.checked = !allChecked;
        });
    });
});
