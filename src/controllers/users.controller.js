import { pool } from "../db.js";

export const getUsers = async (req, res) => {
  try {
    const [result] = await pool.query("Select * from persona");
    res.json({ data: result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: "Algo salió mal",
    });
  }
};

export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query(
      "Select * from persona where idpersona = ?",
      [id]
    );
    if (rows.length > 0) {
      res.json({ data: rows[0], status: 1 });
    } else {
      res.status(404).json({
        data: "Datos no encontrados",
        status: 0,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: "Algo salió mal",
    });
  }
};

export const insertUser = async (req, res) => {
  const {
    nombres,
    apellidos,
    telefono,
    email,
    calle,
    numero,
    password,
    rolid,
  } = req.body;
  try {
    const query =
      "INSERT INTO persona (nombres, apellidos, telefono, email_user, calle, numero, password, rolid) VALUES (?,?,?,?,?,?,?,?)";
    const [rows] = await pool.query(query, [
      nombres,
      apellidos,
      telefono,
      email,
      calle,
      numero,
      password,
      rolid,
    ]);
    res.send({
      id: rows.insertId,
      nombres,
      apellidos,
      telefono,
      email,
      calle,
      numero,
      password,
      rolid,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: "Algo salió mal",
    });
  }
};

export const updateUser = async (req, res) => {
  const {
    nombres,
    apellidos,
    telefono,
    email,
    calle,
    numero,
    password,
    rolid,
  } = req.body;
  try {
    const { id } = req.params;
    const query =
      "UPDATE persona SET nombres = IFNULL(?, nombres), apellidos = IFNULL(?, apellidos), telefono = IFNULL(?, telefono), email_user = IFNULL(?, email_user), calle = IFNULL(?, calle), numero = IFNULL(?, numero), password = IFNULL(?, password), rolid = IFNULL(?, rolid) WHERE idpersona = ?";
    const [result] = await pool.query(query, [
      nombres,
      apellidos,
      telefono,
      email,
      calle,
      numero,
      password,
      rolid,
      id,
    ]);

    if (result.affectedRows === 0) {
      res.status(404).json({
        data: "Usuario no encontrado",
      });
    } else {
      const [rows] = await pool.query(
        "Select * from persona where idpersona = ?",
        [id]
      );
      res.json({ data: "Datos actualizados correctamente", row: rows[0] });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: "Algo salió mal",
    });
  }
};
