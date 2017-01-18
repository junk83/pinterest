module ApplicationHelper
  def apphelper_show_flash_massage(flash)
    # 「!」アイコン
    content_tag("em", "", class: "InputField__errorIcon", style: "position: absolute; right: 14px; top: 14px;") +
    # エラーメッセージ
    content_tag("div", class: "Tooltip_wrapper", data:{ test: { tooltip: "true" }}, style: "top: 0px; width: 215px;") do
      content_tag("div", class: "Tooltip_message", style: "background: rgb(255, 255, 255); border-radius: 6px; box-shadow: rgba(0, 0, 0, 0.380392) 0px 0px 2px, rgba(0, 0, 0, 0.317647) 0px 1px 3px; color: rgb(0, 0, 0); font-style: normal; font-weight: normal; line-height: 150%; padding: 8px 14px; text-align: left; max-width: 215px; display: inline-block; float: left;") do
        content_tag("span") do
          content_tag("b", "エラー：") + flash
        end
      end
    end
  end
end
