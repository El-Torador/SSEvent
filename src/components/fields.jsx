import { useId } from 'react';
import { cx } from './utils.js';
import { AlertIcon, SmallCheck } from './icons.jsx';

function useFieldIds(name) {
  const base = useId() + (name || '');
  return { input: `${base}-in`, hint: `${base}-hint`, error: `${base}-err` };
}

function describedBy(ids, hint, error) {
  return [hint ? ids.hint : null, error ? ids.error : null].filter(Boolean).join(' ') || undefined;
}

function normOptions(options = []) {
  return options.map((o) => (typeof o === 'string' ? { value: o, label: o } : o));
}

function FieldLabel({ as: Tag = 'label', htmlFor, label, required }) {
  return (
    <Tag className="ss-field__label" htmlFor={Tag === 'label' ? htmlFor : undefined}>
      {label}
      {required
        ? <span className="ss-field__req" aria-hidden="true"> *</span>
        : <span className="ss-field__opt"> (facultatif)</span>}
    </Tag>
  );
}

function FieldMessages({ ids, hint, error }) {
  return (
    <>
      {hint ? <p id={ids.hint} className="ss-field__hint">{hint}</p> : null}
      {error ? <p id={ids.error} className="ss-field__error"><AlertIcon /><span>{error}</span></p> : null}
    </>
  );
}

export function TextField({
  name, label, type = 'text', multiline, rows = 5, required, placeholder, defaultValue,
  autoComplete, inputMode, min, max, hint, error, className,
}) {
  const ids = useFieldIds(name);
  const common = {
    id: ids.input, name, className: 'ss-input', required, placeholder, defaultValue, autoComplete, inputMode,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': describedBy(ids, hint, error),
  };
  return (
    <div className={cx('ss-field', error && 'is-invalid', className)}>
      <FieldLabel htmlFor={ids.input} label={label} required={required} />
      {multiline ? <textarea rows={rows} {...common} /> : <input type={type} min={min} max={max} {...common} />}
      <FieldMessages ids={ids} hint={hint} error={error} />
    </div>
  );
}

export function SelectField({ name, label, options, placeholder = 'Choisir…', required, defaultValue = '', hint, error, className }) {
  const ids = useFieldIds(name);
  return (
    <div className={cx('ss-field', error && 'is-invalid', className)}>
      <FieldLabel htmlFor={ids.input} label={label} required={required} />
      <span className="ss-select">
        <select
          id={ids.input}
          name={name}
          className="ss-input"
          required={required}
          defaultValue={defaultValue}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(ids, hint, error)}
        >
          <option value="" disabled>{placeholder}</option>
          {normOptions(options).map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </span>
      <FieldMessages ids={ids} hint={hint} error={error} />
    </div>
  );
}

/** Groupe de « chips » : radio par défaut, cases à cocher avec `multiple`. */
export function ChoiceGroup({ name, label, options, multiple, required, defaultValue, hint, error, className }) {
  const ids = useFieldIds(name);
  const defaults = [].concat(defaultValue || []);
  return (
    <fieldset className={cx('ss-field', 'ss-choice', error && 'is-invalid', className)} aria-describedby={describedBy(ids, hint, error)}>
      <FieldLabel as="legend" label={label} required={required} />
      <div className="ss-choice__options">
        {normOptions(options).map((o, i) => (
          <label key={o.value} className="ss-chip">
            <input
              type={multiple ? 'checkbox' : 'radio'}
              name={name}
              value={o.value}
              className="ss-chip__input"
              defaultChecked={defaults.includes(o.value)}
              aria-invalid={error && i === 0 ? true : undefined}
            />
            <span className="ss-chip__box"><SmallCheck />{o.label}</span>
          </label>
        ))}
      </div>
      <FieldMessages ids={ids} hint={hint} error={error} />
    </fieldset>
  );
}

export function Checkbox({ name, label, value = 'oui', required, defaultChecked, error, className }) {
  const ids = useFieldIds(name);
  return (
    <div className={cx('ss-field', error && 'is-invalid', className)}>
      <label className="ss-check">
        <input
          type="checkbox"
          name={name}
          value={value}
          className="ss-check__input"
          required={required}
          defaultChecked={defaultChecked}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(ids, null, error)}
        />
        <span className="ss-check__box"><SmallCheck /></span>
        <span>{label}{required ? <span className="ss-field__req" aria-hidden="true"> *</span> : null}</span>
      </label>
      <FieldMessages ids={ids} error={error} />
    </div>
  );
}
