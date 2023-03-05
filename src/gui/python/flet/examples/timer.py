from time import sleep
import flet as ft


def main(page: ft.Page):
    page.title = 'Timer of seconds'
    page.vertical_alignment = ft.MainAxisAlignment.CENTER

    timer_text = ft.Text()
    page.add(timer_text)

    for i in range(10):
        timer_text.value = f'Step {i}'
        page.update()
        sleep(1)


ft.app(target=main, port=8887)
