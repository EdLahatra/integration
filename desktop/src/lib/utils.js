import t from 'tcomb-form';

import TemplateTextboxField from '../components/form/inputText/factory-field';
import TextboxFieldFactory from 'common/components/forms/inputText';
TextboxFieldFactory.template = TemplateTextboxField;

import TemplateSelect from '../components/form/select';
import SelectFactory from 'common/components/forms/select';
SelectFactory.template = TemplateSelect;

import TemplateRadio from '../components/form/radio';
import RadioFactory from 'common/components/forms/radio';
RadioFactory.template = TemplateRadio;

import TemplateDropzone from '../components/form/dropzone';
import DropzoneFactory from 'common/components/forms/dropzone';
DropzoneFactory.template = TemplateDropzone;

import TemplateAvatar from '../components/form/avatar';
import AvatarFactory from 'common/components/forms/avatar';
AvatarFactory.template = TemplateAvatar;

import TemplateCheckbox from '../components/form/checkbox';
import CheckboxFactory from 'common/components/forms/checkbox';
CheckboxFactory.template = TemplateCheckbox;

import TemplateDatePicker from '../components/form/datepicker';
import DatePicker from 'common/components/forms/datepicker';
DatePicker.template = TemplateDatePicker;
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
      case 'bool':
        return CheckboxFactory;
      case 'radio':
        return RadioFactory;
      case 'date':
        return DatePicker;
      case 'file':
        return DropzoneFactory;
      case 'avatar':
        return AvatarFactory;
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

  /**
   * Méthodes qui construit la liste des options d'un formulaire 'tcomb-form-native'
   * en fonction d'un schema realm.
   * @param config
   * @param onSubmitEditing
   * @param onFocus
   * @param onCallApi
   * @returns {{}}
   */
  toFieldsOptions(config, { onSubmitEditing = null, onFocus = null, onCallApi = null }) {
    const schema = config.schema;
    const properties = schema.properties;
    const primaryKey = schema.primaryKey;
    const _form = this._getForm(schema, config.formType);

    const propertiesKeys = Object.keys(properties);

    const fieldsOptions = {};

    for (let i = 0; i < propertiesKeys.length; i++) {
      const property = propertiesKeys[i];

      if (primaryKey === property) {
        fieldsOptions[property] = { hidden: true };
      } else {
        const propertyValue = properties[property];
        const _formConfig = _form[property];

        if (_formConfig) {
          fieldsOptions[property] = {
            placeholder: `${schema.name}.placeholder.${property}`,
          };

          if (onSubmitEditing) {
            fieldsOptions[property].onSubmitEditing = () => {
              onSubmitEditing(property);
            };
          }

          if (onFocus) {
            fieldsOptions[property].onFocus = () => {
              onFocus(property);
            };
          }

          if (_formConfig.optionType) {
            const options = config[_formConfig.optionType];

            fieldsOptions[property].options = options;

            fieldsOptions[property].nullOption = {
              value: '',
              text: `${schema.name}.placeholder.${_formConfig.optionType}`,
            };
          }

          if (_formConfig.hidden) {
            fieldsOptions[property].hidden = true;
          }

          if (_formConfig.enums) {
            const options = _formConfig.enums.slice(0, 150)
              .map(key => ({ value: key, text: `${schema.name}.${key}` }));

            fieldsOptions[property].options = options;
            fieldsOptions[property].nullOption = {
              value: '',
              text: `${schema.name}.placeholder.${property}`,
            };
          }

          if (_formConfig.email) {
            fieldsOptions[property].keyboardType = 'email-address';
          }

          if (_formConfig.phone) {
            fieldsOptions[property].keyboardType = 'phone-pad';
          }

          if (_formConfig.editable === false) {
            fieldsOptions[property].editable = false;
          }

          if (_formConfig.api) {
            fieldsOptions[property].api = _formConfig.api;

            fieldsOptions[property].onCallApi = (params) => {
              onCallApi(property, _formConfig.api, params);
            };
            const options = config[_formConfig.api];
            if (options) {
              fieldsOptions[property].options = options;
              fieldsOptions[property].factory = TextboxFieldFactory;
            }
          }

          if (_formConfig.icon) {
            fieldsOptions[property].icon = _formConfig.icon;
          }

          if (_formConfig.iconEnd) {
            fieldsOptions[property].iconEnd = _formConfig.iconEnd;
          }

          if (propertyValue === 'bool' || propertyValue.type === 'bool') {
            // fieldsOptions[property].template = Checkbox;
            fieldsOptions[property].template = TextboxFieldFactory;
          }

          if (propertyValue === 'date' || propertyValue.type === 'date') {
            // fieldsOptions[property].factory = DatepickerFieldFactory;
            fieldsOptions[property].template = TextboxFieldFactory;
            fieldsOptions[property].format = 'dateFormat';
          }

          if (propertyValue === 'float' || propertyValue.type === 'float') {
            fieldsOptions[property].transformer = FloatTransformer;
          }

          if (
            !_formConfig.enums
            && (
              propertyValue === 'string' || propertyValue.type === 'string'
              || propertyValue === 'float' ||
              propertyValue.type === 'float' || propertyValue === 'int'
              || propertyValue.type === 'int'
            )
          ) {
            fieldsOptions[property].factory = TextboxFieldFactory;
          }

          /* if (_formConfig.enums || _formConfig.optionType) {
            fieldsOptions[property].factory = _formConfig.type === 'icon'
              ? IconFieldFactory : SelectFieldFactory;
          } */

          if (_formConfig.isSecured) {
            fieldsOptions[property].secureTextEntry = true;
          }

          if (_formConfig.autoCorrect) {
            fieldsOptions[property].autoCorrect = _formConfig.autoCorrect;
          } else {
            fieldsOptions[property].autoCorrect = false;
          }

          if (_formConfig.autoCapitalize) {
            fieldsOptions[property].autoCapitalize = _formConfig.autoCapitalize;
          } else {
            fieldsOptions[property].autoCapitalize = 'sentences';
          }
        }
      }
    }

    return fieldsOptions;
  },

};
