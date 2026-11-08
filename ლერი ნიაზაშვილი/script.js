document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  fetchEmployees();
  fetchPosts();
});

// 1. ბურგერ მენიუს ლოგიკა
function initNavigation() {
  const burgerBtn = document.getElementById('burgerBtn');
  const navLinks = document.getElementById('navLinks');
  const navItems = document.querySelectorAll('.nav-item');

  burgerBtn.addEventListener('click', () => {
    burgerBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // მენიუს ელემენტზე დაჭერისას მენიუს დახურვა
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      burgerBtn.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });
}

// 2. თანამშრომლების წამოღება (JSONPlaceholder /users)
async function fetchEmployees() {
  const container = document.getElementById('employeesContainer');

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    
    if (!response.ok) {
      throw new Error(`სტატუსის შეცდომა: ${response.status}`);
    }

    const users = await response.json();
    container.innerHTML = '';

    users.forEach(user => {
      const card = document.createElement('div');
      card.classList.add('card');

      card.innerHTML = `
        <h3>${user.name}</h3>
        <p><strong>მომხმარებელი:</strong> @${user.username}</p>
        <p><strong>ელ-ფოსტა:</strong> ${user.email}</p>
        <p><strong>ქალაქი:</strong> ${user.address.city}</p>
        <span class="card-badge">${user.company.name}</span>
      `;

      container.appendChild(card);
    });

  } catch (error) {
    console.error('შეცდომა თანამშრომლების ჩატვირთვისას:', error);
    container.innerHTML = `<p class="error">თანამშრომლების მონაცემების წამოღება ვერ მოხერხდა.</p>`;
  }
}

// 3. დამატებითი ფუნქციონალი: ბოლო 6 პოსტის წამოღება (JSONPlaceholder /posts)
async function fetchPosts() {
  const container = document.getElementById('postsContainer');

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=6');

    if (!response.ok) {
      throw new Error(`სტატუსის შეცდომა: ${response.status}`);
    }

    const posts = await response.json();
    container.innerHTML = '';

    posts.forEach(post => {
      const card = document.createElement('div');
      card.classList.add('card');

      card.innerHTML = `
        <h3>${post.title.substring(0, 30)}...</h3>
        <p>${post.body.substring(0, 90)}...</p>
        <span class="card-badge">Post #${post.id}</span>
      `;

      container.appendChild(card);
    });

  } catch (error) {
    console.error('შეცდომა პოსტების ჩატვირთვისას:', error);
    container.innerHTML = `<p class="error">პოსტების ჩატვირთვა ვერ მოხერხდა.</p>`;
  }
}