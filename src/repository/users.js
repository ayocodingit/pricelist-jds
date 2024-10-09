const users = [
  {
    username: "novansyaah",
    name_card: "Rahadian Novansyah",
    payments: [
      {
        provider: "gopay",
        value: "089669494255",
      },
      {
        provider: "dana",
        value: "089669494255",
      },
      {
        provider: "jago syariah",
        value: "502687237661",
      },
    ],
  },
  {
    username: "duhabduh",
    name_card: "Muhamad Abduh",
    payments: [
      {
        provider: "gopay",
        value: "085722507840",
      },
      {
        provider: "jago syariah",
        value: "501150988960",
      },
    ],
  },
  {
    username: "samudra_ajri",
    name_card: "Samudra Ajri",
    payments: [
      {
        provider: "gopay",
        value: "082129379891",
      },
      {
        provider: "ovo",
        value: "082129379891",
      },
    ],
  },
  {
    username: "ashrinp",
    name_card: "Ashri Permana",
    payments: [
      {
        provider: "gopay",
        value: "089666300757",
      },
      {
        provider: "ovo",
        value: "089666300757",
      },
      {
        provider: "jago",
        value: "07925176333",
      },
    ],
  },
];

export const getUser = (username) => {
  return users.filter((user) => user.username === username)[0];
};
