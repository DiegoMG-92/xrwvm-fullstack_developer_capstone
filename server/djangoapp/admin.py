from django.contrib import admin
from .models import CarMake, CarModel


# Inline class for CarModel to show models inline within a CarMake admin page
class CarModelInline(admin.TabularInline):
    model = CarModel
    extra = 1


# Admin class for CarMake that includes CarModelInline
class CarMakeAdmin(admin.ModelAdmin):
    inlines = [CarModelInline]
    list_display = ('name', 'description')
    search_fields = ['name']


# Admin class for CarModel
class CarModelAdmin(admin.ModelAdmin):
    list_display = ('name', 'car_make', 'type', 'year', 'dealer_id')
    list_filter = ['type', 'year']
    search_fields = ['name', 'car_make__name']


# Register the models with their admin classes
admin.site.register(CarMake, CarMakeAdmin)
admin.site.register(CarModel, CarModelAdmin)