// Задание 1
// Представьте, что у вас есть класс для управления библиотекой. В этом классе будет приватное свойство для хранения списка книг, а также методы для добавления книги, удаления книги и получения информации о наличии книги.
// Класс должен содержать приватное свойство #books, которое инициализируется пустым массивом и представляет собой список книг в библиотеке.
// Реализуйте геттер allBooks, который возвращает текущий список книг.
// Реализуйте метод addBook(title), который позволяет добавлять книгу в список. Если книга с таким названием уже существует в списке, выбросьте ошибку с соответствующим сообщением.
// Реализуйте метод removeBook(title), который позволит удалять книгу из списка по названию. Если книги с таким названием нет в списке, выбросьте ошибку с соответствующим сообщением.
// Реализуйте метод hasBook(title), который будет проверять наличие книги в библиотеке и возвращать true или false в зависимости от того, есть ли такая книга в списке или нет.
// Реализуйте конструктор, который принимает начальный список книг (массив) в качестве аргумента. Убедитесь, что предоставленный массив не содержит дубликатов; в противном случае выбрасывайте ошибку.

class Library {
    #books = [];

    constructor(books = []) {
        if (Array.isArray(books)) {
            const temp = books.filter((book) => {
                return books.indexOf(book) === books[book];
            });
            if (temp.length >= 1) {
                throw new Error("The array has duplicate books");
            }
            this.#books = books;
        } else {
            throw new Error("Input element is not an array");
        }
    }

    get allBooks() {
        return this.#books;
    }

    addBook(title) {
        if (this.hasBook(title)) {
            throw new Error("This libraru alraedy has this book");
        }
        this.#books.push(title);
    }

    removeBook(title) {
        if (!this.hasBook(title)) {
            throw new Error(
                "We can`t remove the book that is not in the library"
            );
        }
        this.#books = this.#books.filter((elem) => {
            return elem !== title;
        });
    }

    hasBook(title) {
        if (this.#books.includes(title)) {
            return true;
        }
        return false;
    }
}

const lib1 = new Library();
lib1.addBook("JS");
lib1.addBook("Aducational JS");
console.log(lib1.allBooks);
console.log(lib1.hasBook("JS"));
lib1.removeBook("JS");
console.log(lib1.allBooks);

// Задание 2
// Вы разрабатываете систему отзывов для вашего веб-сайта. Пользователи могут оставлять отзывы, но чтобы исключить слишком короткие или слишком длинные сообщения, вы решаете установить некоторые ограничения.
// Создайте HTML-структуру с текстовым полем для ввода отзыва, кнопкой для отправки и контейнером, где будут отображаться отзывы.
// Напишите функцию, которая будет добавлять отзыв в контейнер с отзывами. Однако если длина введенного отзыва менее 50 или более 500 символов, функция должна генерировать исключение.
// При добавлении отзыва, он должен отображаться на странице под предыдущими отзывами, а не заменять их.

const inputEl = document.getElementById("input");
const btnEl = document.querySelector(".btn");
const select = document.querySelector(".vars");
const divEl = document.querySelector(".content");
divEl.style.width = "300px";
let count = 1;

const initialData = [
    {
        product: "Apple iPhone 13",
        reviews: [],
    },
    {
        product: "Samsung Galaxy Z Fold 3",
        reviews: [],
    },
    {
        product: "Sony PlayStation 5",
        reviews: [],
    },
];
function addReview() {
    divEl.innerHTML = "";
    try {
        if (inputEl.value.length < 50 || inputEl.value.length > 500) {
            throw new Error("This review is too short or too long");
        }
        let selectedIndex = select.selectedIndex;
        let type = select.options[selectedIndex].value;
        initialData[type].reviews.push({ id: count++, text: inputEl.value });
    } catch (error) {
        console.log(error.message);
    } finally {
        let res = " ";
        for (const item of initialData) {
            res += JSON.stringify(item, null, 2);
        }
        divEl.innerHTML = res;
    }
}

btnEl.addEventListener("click", addReview);
