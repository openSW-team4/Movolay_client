document.addEventListener('DOMContentLoaded', () => {
    // 장르별로 분류된 예제 영화 데이터
    const movies = {
        Romance: [
            {
                id: 1,
                title: 'Romantic Movie 1',
                genre: 'Romance',
                rating: '8.5',
                userRating: '4.5',
                views: '1000',
                releaseDate: '2021-01-01',
                description: 'Description of Romantic Movie 1',
                poster: 'https://via.placeholder.com/200x300',
                trailer: 'dQw4w9WgXcQ'
            },
            {
                id: 2,
                title: 'Romantic Movie 2',
                genre: 'Romance',
                rating: '8.2',
                userRating: '4.2',
                views: '900',
                releaseDate: '2021-02-01',
                description: 'Description of Romantic Movie 2',
                poster: 'https://via.placeholder.com/200x300',
                trailer: 'dQw4w9WgXcQ'
            }
        ],
        Horror: [
            {
                id: 3,
                title: 'Horror Movie 1',
                genre: 'Horror',
                rating: '7.5',
                userRating: '3.5',
                views: '2000',
                releaseDate: '2020-01-01',
                description: 'Description of Horror Movie 1',
                poster: 'https://via.placeholder.com/200x300',
                trailer: 'dQw4w9WgXcQ'
            }
        ],
        Animation: [
            {
                id: 4,
                title: 'Animation Movie 1',
                genre: 'Animation',
                rating: '9.0',
                userRating: '5.0',
                views: '3000',
                releaseDate: '2019-01-01',
                description: 'Description of Animation Movie 1',
                poster: 'https://via.placeholder.com/200x300',
                trailer: 'dQw4w9WgXcQ'
            }
        ]
    };

    // 유저 데이터 시뮬레이션
    const userData = {
        username: 'testUser',
        password: 'password123',
        preferences: ['Romance', 'Horror', 'Animation']
    };

    // 로그인 폼 handling
    document.getElementById('loginForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        // 로그인 로직 추가
        window.location.href = 'main.html';
    });

    // 회원가입 폼 handling
    document.getElementById('signupForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        // 회원가입 로직 추가
        window.location.href = 'main.html';
    });

    // 로그아웃 버튼 handling
    document.getElementById('logoutButton')?.addEventListener('click', () => {
        // 로그아웃 로직 추가
        window.location.href = 'login.html';
    });

    // 메인 페이지에 영화 표시
    const moviesContainer = document.getElementById('moviesContainer');
    if (moviesContainer) {
        userData.preferences.forEach((preference) => {
            if (movies[preference]) {
                const genreRow = document.createElement('div');
                genreRow.classList.add('genre-row');
                genreRow.innerHTML = `<h2>${preference}</h2>`;
                movies[preference].forEach(movie => {
                    const movieElement = document.createElement('div');
                    movieElement.classList.add('movie-poster');
                    movieElement.innerHTML = `<img src="${movie.poster}" alt="${movie.title}">`;
                    movieElement.addEventListener('click', () => showMovieDetails(movie));
                    genreRow.appendChild(movieElement);
                });
                moviesContainer.appendChild(genreRow);
            }
        });
    }

    // 모달 청에 영화 상세 정보 표시
    const showMovieDetails = (movie) => {
        document.getElementById('trailer').src = `https://www.youtube.com/embed/${movie.trailer}?autoplay=1`;
        document.getElementById('movieTitle').innerText = movie.title;
        document.getElementById('movieGenre').innerText = `Genre: ${movie.genre}`;
        document.getElementById('movieRating').innerText = `Rating: ${movie.rating}`;
        document.getElementById('userRating').innerText = `User Rating: ${movie.userRating}`;
        document.getElementById('movieViews').innerText = `Views: ${movie.views}`;
        document.getElementById('releaseDate').innerText = `Release Date: ${movie.releaseDate}`;
        document.getElementById('movieDescription').innerText = movie.description;
        document.getElementById('movieModal').style.display = 'flex';
    };

    // 모달 창 닫기
    document.getElementById('closeModal')?.addEventListener('click', () => {
        document.getElementById('trailer').src = '';
        document.getElementById('movieModal').style.display = 'none';
    });

    // 프로필 페이지에 유저 데이터 로드
    if (document.getElementById('profileForm')) {
        document.getElementById('username').value = userData.username;
        document.getElementById('password').value = userData.password;
        userData.preferences.forEach(preference => {
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
            // 업데이트된 취향 저장 (여기서는 콘솔에 로그 출력험)
            console.log('Saved Preferences:', newPreferences);
            window.location.href = 'main.html';
        });
    }
});
