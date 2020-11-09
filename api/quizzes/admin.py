from django.contrib import admin
import nested_admin
from .models import Quiz, Question, Answer, UserAnswer, QuizTaker, Subject, Level

class AnswerInline(nested_admin.NestedTabularInline):
    model = Answer
    extra = 4
    max_num = 4

class QuestionInline(nested_admin.NestedTabularInline):
    model = Question
    inlines = [AnswerInline,]
    extra = 19

class QuizAdmin(nested_admin.NestedModelAdmin):
    inlines = [QuestionInline,]

class SubjectAdmin(admin.ModelAdmin):
    model = Subject

class LevelAdmin(admin.ModelAdmin):
    model = Level

class UserAnswerInline(admin.TabularInline):
    model = UserAnswer

class QuizTakersAdmin(admin.ModelAdmin):
    inlines = [UserAnswerInline,]

admin.site.register(Quiz, QuizAdmin)
admin.site.register(Subject, SubjectAdmin)
admin.site.register(Level, LevelAdmin)
admin.site.register(QuizTaker, QuizTakersAdmin)
admin.site.register(UserAnswer)