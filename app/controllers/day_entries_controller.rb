class DayEntriesController < ApplicationController
  # GET /day_entries
  # GET /day_entries.json
  def index
    @day_entries = DayEntry.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @day_entries }
    end
  end

  # GET /day_entries/1
  # GET /day_entries/1.json
  def show
    @day_entry = DayEntry.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @day_entry }
    end
  end

  # GET /day_entries/new
  # GET /day_entries/new.json
  def new
    @day_entry = DayEntry.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @day_entry }
    end
  end

  # GET /day_entries/1/edit
  def edit
    @day_entry = DayEntry.find(params[:id])
  end

  # POST /day_entries
  # POST /day_entries.json
  def create
    @day_entry = DayEntry.new(params[:day_entry])

    respond_to do |format|
      if @day_entry.save
        format.html { redirect_to @day_entry, notice: 'Day entry was successfully created.' }
        format.json { render json: @day_entry, status: :created, location: @day_entry }
      else
        format.html { render action: "new" }
        format.json { render json: @day_entry.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /day_entries/1
  # PUT /day_entries/1.json
  def update
    @day_entry = DayEntry.find(params[:id])

    respond_to do |format|
      if @day_entry.update_attributes(params[:day_entry])
        format.html { redirect_to @day_entry, notice: 'Day entry was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @day_entry.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /day_entries/1
  # DELETE /day_entries/1.json
  def destroy
    @day_entry = DayEntry.find(params[:id])
    @day_entry.destroy

    respond_to do |format|
      format.html { redirect_to day_entries_url }
      format.json { head :no_content }
    end
  end
end
