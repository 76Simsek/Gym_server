const { query } = require('../db/db');

const getGym = async () => {
  const { rows } = await query(`
    select gym_id, p.plan, kommentar, date,
       concat(extract(day from date),'.',extract(month from date),'.',extract(year from date)) as datum
       , gym, planimg
from "Gyimming" join public."Plan" P on P.plan = "Gyimming".plan
order by extract(month from date) DESC, extract(day from date) DESC;
`);
  return rows;
};

const getPlan = async (plan) => {
  const { rows } = await query(
    `
    select gym_id ,p.plan, kommentar,
       concat(extract(day from date),'.',extract(month from date),'.',extract(year from date)) as datum, date,
       gym, planimg
    from "Gyimming" join public."Plan" P on P.plan = "Gyimming".plan
    where P.plan = $1
    order by extract(month from date) DESC, extract(day from date) DESC;
`,
    [plan],
  );
  return rows;
};

const getWorkout = async () => {
  const { rows } = await query(`
    select u.id gym_id, g.plan, u.übung, concat(u.repw1,' x ',u.weightw1, 'KG') as Wdh1,g.date,
       concat(extract(day from g.date),'.',extract(month from g.date),'.',extract(year from g.date)) as datum,
       (case when u.repw4 != 0 then concat(u.repw2,' x ', u.weightw2) end) as Wdh2,
       (case when u.repw4 != 0 then concat(u.repw3,' x ', u.weightw3) end) as Wdh3,
       (case when u.repw4 != 0 then concat(u.repw4,' x ', u.weightw4) end) as Wdh4,
       (case when u.repw5 != 0 then concat(u.repw5,' x ', u.weightw5, 'KG') end) as Wdh5,
       u.drop, g.kommentar
       from "Gyimming" g
           join "Uebungen" u on g.gym_id = u.gym_id
order by g.date DESC;
`);
  return rows;
};

const getPlanWorkout = async (plan) => {
  const { rows } = await query(
    `
    select u.id gym_id, g.plan, u.übung, concat(u.repw1,' x ',u.weightw1, 'KG') as Wdh1, g.date,
       concat(extract(day from g.date),'.',extract(month from g.date),'.',extract(year from g.date)) as datum,
       (case when u.repw4 != 0 then concat(u.repw2,' x ', u.weightw2) end) as Wdh2,
       (case when u.repw4 != 0 then concat(u.repw3,' x ', u.weightw3) end) as Wdh3,
       (case when u.repw4 != 0 then concat(u.repw4,' x ', u.weightw4) end) as Wdh4,
       (case when u.repw5 != 0 then concat(u.repw5,' x ', u.weightw5, 'KG') end) as Wdh5,
       u.drop, g.kommentar
       from "Gyimming" g
           join "Uebungen" u on g.gym_id = u.gym_id
       where g.gym_id = $1
order by g.date DESC;
`,
    [plan],
  );
  return rows;
};

const addUebung = async (body) => {
  const { rows } = await query(
    `INSERT INTO "Uebungen"
        (id, gym_id, übung,
          weightw1, repw1,
          weightw2, repw2,
          weightw3, repw3,
          weightw4, repw4,
          weightw5, repw5,
        date) VALUES ( DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) returning *`,
    [
      body.gym_id,
      body.übung,
      body.weightw1,
      body.repw1,
      body.weightw2,
      body.repw2,
      body.weightw3,
      body.repw3,
      body.weightw4,
      body.repw4,
      body.weightw5,
      body.repw5,
      body.date,
    ],
  );
  return rows;
};

const addPlan = async (body) => {
  const p = '1';
  const { rows } = await query(
    'INSERT INTO "Gyimming" (gym_id, user_id, gym, date, plan, kommentar) VALUES ( DEFAULT, $1, $2, $3, $4, $5) returning *',
    [p, body.gym, body.date, body.plan, body.kommentar],
  );
  return rows;
};

module.exports = {
  getGym,
  getPlan,
  getWorkout,
  getPlanWorkout,
  addPlan,
  addUebung,
};
