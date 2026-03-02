      @if (data()!.languages) {
        <section class="section section--half" id="section-languages">
          <h2 class="section__title">{{ sections()!.spokenLanguages }}</h2>
          <ul class="bulletlist">
            @for (lang of data()!.languages.type.spoken; track lang.name) {
              <li class="p-skill">
                {{ lang.name }} - <em>{{ lang.level }}</em>
              </li>
            }
          </ul>
        </section>
      }
