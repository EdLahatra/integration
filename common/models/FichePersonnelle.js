const Schema = {
  name: 'FichePersonnelle',
  primaryKey: 'id',
  properties: {
    nom: { type: 'string' },
    email: { type: 'email' },
    ville: { type: 'string', optional: true },
    list: { type: 'select' },
    birthday: { type: 'date' },
    file: { type: 'file' },
  },
};

class FichePersonnelle {
  static schema = Schema;
}

export default FichePersonnelle;

