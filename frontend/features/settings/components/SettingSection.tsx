import stylex from "@stylexjs/stylex"
import { useSettingContext, type SettingSectionOptions } from "../provider"
import { SwitchInput } from "../../../components"
import type { app } from "../../../wailsjs/go/models"

const style = stylex.create({
  dialog: {
    display: "flex",
    justifyContent: "center",
    userSelect: "none",
    alignItems: "center"
  },
  dialog__content: {
    width: "41.25rem",
    height: "60%",
    paddingBlock: 10,
    paddingInline: 15,
    backgroundColor: "var(--crust)",
    borderRadius: 6
  },
  dialog__section: {
    marginBlock: 10
  },
  dialog__description: {
    fontSize: 14,
    color: "var(--subtext-1)"
  },
  dialog__settingName: {
    display: "flex",
    alignItems: "center"
  },
  dialog__switchContainer: {
    marginLeft: "auto"
  }
})

interface ISettingSectionProps extends SettingSectionOptions {
  propName$: keyof app.SettingData
}

export default function SettingSection(props: ISettingSectionProps) {
  const { setting$, _setSetting$ } = useSettingContext()

  const settingChanged = (propName: string, value: boolean) => {
    _setSetting$(propName as keyof app.SettingData, value)
    console.log('Set', propName, '=', value)
  }
  
  return (
    <section {...stylex.attrs(style.dialog__section)}>
      <h4 {...stylex.attrs(style.dialog__settingName)}>
        {props.name$}
        <div {...stylex.attrs(style.dialog__switchContainer)}>
          <SwitchInput
            value$={setting$[props.propName$]}
            onChange$={(value) => settingChanged(props.propName$, value)}
          />
        </div>
      </h4>
      <p {...stylex.attrs(style.dialog__description)}>
        {props.description$}
      </p>
      <props.component$ state$={setting$[props.propName$]} />
    </section>
  )
}