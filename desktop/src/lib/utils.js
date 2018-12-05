import t from 'tcomb-form';

import TextboxFieldFactory from 'forms/inputText';

import SelectFactory from 'forms/select';

// import RadioFactory from 'forms/radio';

import DropzoneFactory from 'forms/dropzone';

// import AvatarFactory from 'forms/avatar';

// import CheckboxFactory from 'common/components/forms/checkbox';

import DatePicker from 'forms/datepicker';

/* DatePicker.transformer = {
  format: value => (Nil.is(value) ? new Date() : value),
  parse: value => moment(value, I18n.t('dateFormat')).toDate(),
}; */

/**
 * Classe utilitaire pour manipuler les objets en realm.
 */
export default {
  /**
   * Construit un uuid
   * @returns {string}
   */
  uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const d = new Date().getTime();
      const r = (d + Math.random() * 16) % 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8); // eslint-disable-line
      return v.toString(16);
    });
  },

  /**
   * Méthode qui vérifie la syntaxe d'un email
   * @param email
   * @returns {boolean}
   */
  verifyEmail(email) {
    return /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(email); // eslint-disable-line
  },

  toFactoryStruct(value) {
    switch (value.type) {
      case 'string':
        return TextboxFieldFactory;
      case 'email':
        return TextboxFieldFactory;
      case 'select':
        return SelectFactory;
      case 'date':
        return DatePicker;
      case 'file':
        return DropzoneFactory;
      /*
      case 'bool':
        return CheckboxFactory;
      case 'radio':
        return RadioFactory;
      case 'avatar':
        return AvatarFactory;
      */
      default:
        return TextboxFieldFactory;
    }
  },

  toTypeStruct(value) {
    switch (value.type) {
      case 'string':
        return t.String;
      case 'select':
      return t.list(t.String);
      case 'email':
        return t.refinement(t.String, this.verifyEmail);
      case 'radio':
        return t.Boolean;
      case 'bool':
        return t.Boolean;
      case 'date':
        return t.Date;
      case 'file':
        return t.Any
      case 'avatar':
        return t.Any;
      default:
        return t.String;
    }
  },

  toFormTypeAndFieldsOptions({ schema }, funct) {
    console.log(funct);
    const properties = schema.properties;
    const primaryKey = schema.primaryKey;
    const propertiesKeys = Object.keys(properties);
    const form = {};
    const fields = {};

    propertiesKeys.forEach(key => {
      const item = properties[key];
      if (item === primaryKey) {
        form[key] = t.maybe(t.String);
        fields[key] = {};
      }
  
      const type = this.toTypeStruct(item);
      form[key] = item.optional ? t.maybe(type) : type;

      fields[key] = {
        placeholder: `placeholder.${key}`,
        factory: this.toFactoryStruct(item),
        fullWidth: true,
        label: key
      };

    });

    return {
      type: t.struct(form),
      fields
    };
  },

};
