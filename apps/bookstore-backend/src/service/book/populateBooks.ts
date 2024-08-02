import createBook from "./createBook";

const populateBooks = async () => {
  const data = [
    {
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      publication_year: 1960,
      description: "A classic novel depicting racial injustice in the American South.",
      isbn: "9780061120084"
    },
    {
      title: "1984",
      author: "George Orwell",
      publication_year: 1949,
      description: "A dystopian novel portraying a totalitarian society.",
      isbn: "9780451524935"
    },
    {
      title: "Pride and Prejudice",
      author: "Jane Austen",
      publication_year: 1813,
      description: "A classic novel exploring themes of love, marriage, and social norms.",
      isbn: "9781503290563"
    },
    {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      publication_year: 1925,
      description: "A tale of the American Dream, wealth, and love during the Roaring Twenties.",
      isbn: "9780743273565"
    },
    {
      title: "The Lord of the Rings",
      author: "J.R.R. Tolkien",
      publication_year: 1954,
      description: "An epic fantasy saga about the quest to destroy the One Ring.",
      isbn: "9780544003415"
    },
    {
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      publication_year: 1951,
      description: "A classic coming-of-age novel following Holden Caulfield's journey.",
      isbn: "9780316769488"
    },
    {
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      publication_year: 1937,
      description: "The prequel to The Lord of the Rings, following Bilbo Baggins' journey.",
      isbn: "9780547928227"
    },
    {
      title: "War and Peace",
      author: "Leo Tolstoy",
      publication_year: 1869,
      description: "A monumental work depicting the events of Russian society during the Napoleonic era.",
      isbn: "9781400079988"
    },
    {
      title: "The Divine Comedy",
      author: "Dante Alighieri",
      publication_year: 1320,
      description: "An epic poem that follows the journey of the soul through Hell, Purgatory, and Heaven.",
      isbn: "9780142437223"
    },
    {
      title: "The Brothers Karamazov",
      author: "Fyodor Dostoevsky",
      publication_year: 1880,
      description: "A complex novel exploring themes of spirituality, morality, and human nature.",
      isbn: "9780374528379"
    },
    {
      title: "Crime and Punishment",
      author: "Fyodor Dostoevsky",
      publication_year: 1866,
      description: "A psychological thriller revolving around guilt, conscience, and redemption.",
      isbn: "9780486415871"
    },
    {
      title: "The Picture of Dorian Gray",
      author: "Oscar Wilde",
      publication_year: 1890,
      description: "A novel about a man whose portrait ages while he retains his youth and beauty.",
      isbn: "9780141439570"
    },
    {
      title: "Brave New World",
      author: "Aldous Huxley",
      publication_year: 1932,
      description: "A dystopian vision of a future society obsessed with pleasure and conformity.",
      isbn: "9780060850524"
    },
    {
      title: "The Count of Monte Cristo",
      author: "Alexandre Dumas",
      publication_year: 1844,
      description: "An adventure novel of revenge, love, and redemption set in the early 19th century.",
      isbn: "9780140449266"
    },
    {
      title: "Anna Karenina",
      author: "Leo Tolstoy",
      publication_year: 1877,
      description: "A tragic love story set against the backdrop of Russian high society.",
      isbn: "9780143035008"
    },
    {
      title: "Frankenstein",
      author: "Mary Shelley",
      publication_year: 1818,
      description: "A novel about the creation of a monster and the consequences of playing god.",
      isbn: "9780486282114"
    },
    {
      title: "Slaughterhouse-Five",
      author: "Kurt Vonnegut",
      publication_year: 1969,
      description: "An anti-war novel that mixes science fiction and dark humor.",
      isbn: "9780385333849"
    },
    {
      title: "The Grapes of Wrath",
      author: "John Steinbeck",
      publication_year: 1939,
      description: "A novel about the plight of migrant workers during the Great Depression.",
      isbn: "9780143039433"
    },
    {
      title: "Fahrenheit 451",
      author: "Ray Bradbury",
      publication_year: 1953,
      description: "A dystopian novel depicting a future society where books are banned.",
      isbn: "9781451673319"
    },
    {
      title: "The Lord of the Flies",
      author: "William Golding",
      publication_year: 1954,
      description: "A novel about a group of British boys stranded on an uninhabited island.",
      isbn: "9780399501487"
    },
    {
      title: "A Tale of Two Cities",
      author: "Charles Dickens",
      publication_year: 1859,
      description: "A historical novel set during the French Revolution, exploring themes of sacrifice and resurrection.",
      isbn: "9780486406510"
    },
    {
      title: "The Handmaid's Tale",
      author: "Margaret Atwood",
      publication_year: 1985,
      description: "A dystopian novel set in a totalitarian society where women are subjugated.",
      isbn: "9780385490818"
    },
    {
      title: "The Name of the Rose",
      author: "Umberto Eco",
      publication_year: 1980,
      description: "A medieval mystery novel set in an Italian monastery.",
      isbn: "9780156001311"
    },
    {
      title: "The Kite Runner",
      author: "Khaled Hosseini",
      publication_year: 2003,
      description: "A novel about friendship, redemption, and the impact of war in Afghanistan.",
      isbn: "9781594631931"
    },
    {
      title: "The Giver",
      author: "Lois Lowry",
      publication_year: 1993,
      description: "A dystopian novel about a society with strict control over emotions and memories.",
      isbn: "9780544336261"
    },
    {
      title: "The Metamorphosis",
      author: "Franz Kafka",
      publication_year: 1915,
      description: "A novella about a man who wakes up one morning transformed into a giant insect.",
      isbn: "9780486290300"
    },
    {
      title: "Gone with the Wind",
      author: "Margaret Mitchell",
      publication_year: 1936,
      description: "A historical novel set during the American Civil War, centered around Scarlett O'Hara.",
      isbn: "9781451635621"
    },
    {
      title: "The Wind in the Willows",
      author: "Kenneth Grahame",
      publication_year: 1908,
      description: "A children's novel about the adventures of anthropomorphic animals.",
      isbn: "9780143039099"
    },
    {
      title: "Dracula",
      author: "Bram Stoker",
      publication_year: 1897,
      description: "A Gothic horror novel about the vampire Count Dracula's attempt to move to England.",
      isbn: "9780486411095"
    },
    {
      title: "The Call of the Wild",
      author: "Jack London",
      publication_year: 1903,
      description: "An adventure novel about a domestic dog's life in the wilds of the Yukon.",
      isbn: "9780486264721"
    },
    {
      title: "The Stand",
      author: "Stephen King",
      publication_year: 1978,
      description: "A post-apocalyptic horror novel about a deadly pandemic and its aftermath.",
      isbn: "9780307743688"
    },
    {
      title: "The Color Purple",
      author: "Alice Walker",
      publication_year: 1982,
      description: "A novel about the life of African-American women in the Southern United States.",
      isbn: "9780156028356"
    },
    {
      title: "The Silmarillion",
      author: "J.R.R. Tolkien",
      publication_year: 1977,
      description: "A collection of mythopoeic stories about the history of Middle-earth.",
      isbn: "9780618391110"
    }
  ];

  for (let i = 0; i < data.length; i++) {
    await createBook(data[i]);
  }
};

export default populateBooks;
