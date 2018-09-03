import React, {Component} from 'react';
import {ShotChart} from "./ShotChart";
import {Radio, Switch} from 'antd';
import {CountSlider} from "./CountSlider";
import _ from 'lodash';

const RadioGroup = Radio.Group;

export class DataViewContainer extends Component {
    state = {
        minCount: 2,
        chartType: 'hexbin',
        displayToolTips: true,
    }

    onCountSliderChange = (value) => {
        this.setState({
            minCount: value
        })
    }

    onChartTypeChange = (e) => {
        this.setState({
           chartType: e.target.value
        });
    }

    onTooltipChange = (checked) => {
        this.setState({
            displayToolTips: checked
        })
    }

    render() {
        const { minCount, chartType } = this.state;

        return (
            <div className="data-view">
                <ShotChart
                    playerId={this.props.playerId}
                    minCount={this.state.minCount}
                    chartType={this.state.chartType}
                    displayToolTips={this.state.displayToolTips}
                />
                <div className="filters">
                {
                    (chartType === "hexbin"?
                    <CountSlider
                        defaultValue={minCount}
                        onCountSliderChange={ _.debounce(this.onCountSliderChange, 500)}
                    /> :null)
                }
                <br/>
                    <RadioGroup onChange={this.onChartTypeChange} value={chartType}>
                        <Radio value="hexbin">Hexbin</Radio>
                        <Radio value="scatter">Scatter</Radio>
                    </RadioGroup>
                    <Switch
                        checkedChildren="On"
                        unCheckedChildren="Off"
                        onChange={this.onTooltipChange}
                        defaultChecked/>
                </div>
            </div>
        );
    }
}