const Schema = {
  name: 'FichePersonnelle',
  primaryKey: 'id',
  properties: {
    avatar: { type: 'avatar' },
    nom: { type: 'string' },
    email: { type: 'email' },
    ville: { type: 'string', optional: true },
    list: { type: 'select' },
    bool: { type: 'bool' },
    radio: { type: 'radio' },
    birthday: { type: 'date' },
    file: { type: 'file' },
  },
};

class FichePersonnelle {
  static schema = Schema;
}

export default FichePersonnelle;
