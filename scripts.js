document.addEventListener('DOMContentLoaded', () => {
    // 예시 영화 데이터
    const movies = [
        {
            id: 1,
            title: 'Movie 1',
            genre: 'Action',
            rating: '8.5',
            userRating: '4.5',
            views: '1000',
            releaseDate: '2021-01-01',
            description: 'Description of Movie 1',
            poster: 'https://via.placeholder.com/200x300',
            trailer: 'dQw4w9WgXcQ'
        },
    ];

    // 예시 유저 데이터
    const userData = {
        username: 'testUser',
        password: 'password123',
        preferences: ['Romance', 'Horror']
    };

    // 로그인 폼 handling
    document.getElementById('loginForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        window.location.href = 'main.html';
    });

    // 회원가입 폼 handling
    document.getElementById('signupForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        window.location.href = 'main.html';
    });

    // 로그아웃 버튼 handling
    document.getElementById('logoutButton')?.addEventListener('click', () => {
        window.location.href = 'login.html';
    });

    // 메인페이지에서 영화 팜플렛 보여줌
    const moviesContainer = document.getElementById('moviesContainer');
    if (moviesContainer) {
        movies.forEach(movie => {
            const movieElement = document.createElement('div');
            movieElement.classList.add('movie-poster');
            movieElement.innerHTML = `<img src="${movie.poster}" alt="${movie.title}">`;
            movieElement.addEventListener('click', () => showMovieDetails(movie));
            moviesContainer.appendChild(movieElement);
        });
    }

    // 모달 창에서 상세정보 보여줌
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

    // 프로필 페이지에서 유저 데이터 불러오기
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
            // 수정된 취향 저장 (콘솔에만 로그)
            console.log('Saved Preferences:', newPreferences);
            window.location.href = 'main.html';
        });
    }
});
