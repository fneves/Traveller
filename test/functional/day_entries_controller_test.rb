require 'test_helper'

class DayEntriesControllerTest < ActionController::TestCase
  setup do
    @day_entry = day_entries(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:day_entries)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create day_entry" do
    assert_difference('DayEntry.count') do
      post :create, day_entry: { day: @day_entry.day, story: @day_entry.story, title: @day_entry.title }
    end

    assert_redirected_to day_entry_path(assigns(:day_entry))
  end

  test "should show day_entry" do
    get :show, id: @day_entry
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @day_entry
    assert_response :success
  end

  test "should update day_entry" do
    put :update, id: @day_entry, day_entry: { day: @day_entry.day, story: @day_entry.story, title: @day_entry.title }
    assert_redirected_to day_entry_path(assigns(:day_entry))
  end

  test "should destroy day_entry" do
    assert_difference('DayEntry.count', -1) do
      delete :destroy, id: @day_entry
    end

    assert_redirected_to day_entries_path
  end
end
